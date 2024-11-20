import { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AttachmentPreview from "./AttachmentPreview";
import ErrorMessage from "./ErrorMessage";
import InputArea from "./InputArea";
import useWebSocket from "./WebSocket";
import { storage } from "../../../firebase";
import apiClient from "../../../services/apiClient";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [ChatSession, setChatSession] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    apiClient.get('/chat/sessions/')
      .then(response => {
        const session = response.data.find(session => session.id === ChatSession);
        console.log(session);
        
        setChatSession(session);
      });
  }, [ChatSession]);
  const { sendMessage } = useWebSocket(ChatSession, (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.message, sender: "admin", timestamp: new Date().toLocaleTimeString() },
    ]);
  });

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          (error) => {
            setError("Error uploading file");
            console.error("Error uploading file", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setAttachment({ name: file.name, url: downloadURL, type: file.type });
            });
          }
        );
      } catch (error) {
        setError("Error uploading file");
        console.error("Error uploading file", error);
      }
    }
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" && !attachment) return;

    let attachmentUrl = null;
    if (attachment) {
      try {
        attachmentUrl = attachment.url;
      } catch {
        return;
      }
    }

    const newMsg = {
      text: newMessage,
      sender: "self",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
      attachment: attachmentUrl ? { url: attachmentUrl } : null,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachment(null);
    setUploadProgress(null);

    try {

      const response = await apiClient.post(`/chat/${ChatSession}/messages/`, newMsg);
      const savedMessage = response.data;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered", id: savedMessage.id } : msg))
      );
    } catch (error) {
      setError("Error sending message");
    }

    sendMessage({ message: newMessage, attachment: attachmentUrl });
  };


  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[350px] h-[500px] sm:w-[450px] max-h-[500px] bg-white shadow-lg rounded-lg flex flex-col space-y-6 p-4">
      <ChatHeader onlineStatus="online" onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {uploadProgress !== null && (
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      {error && <ErrorMessage error={error} onRetry={() => setError(null)} />}
      {attachment && <AttachmentPreview attachment={attachment} onRemove={() => setAttachment(null)} />}
      <InputArea
        newMessage={newMessage}
        onMessageChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        onFileSelect={handleFileSelect}
        onSend={handleSend}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default ChatBox;
