import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AttachmentPreview from "./AttachmentPreview";
import ErrorMessage from "./ErrorMessage";
import InputArea from "./InputArea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState("online");
  const [uploadProgress, setUploadProgress] = useState(null);
  const lastLoginTime = 0
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === "" && !attachment) return;

    let attachmentUrl = null;

    if (attachment) {
      try {
        const storageRef = ref(storage, `attachments/${attachment.name}`);
        const uploadTask = uploadBytesResumable(storageRef, attachment.file);

        // Track the upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress); // Update progress state
          },
          (error) => {
            setError("Error uploading file");
            console.error(error);
          },
          () => {
            // Get the download URL once the upload is complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              attachmentUrl = downloadURL;

              const newMsg = {
                id: messages.length + 1,
                text: newMessage,
                sender: "self",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: "sending",
                avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
                attachment: { ...attachment, url: attachmentUrl },
              };

              setMessages([...messages, newMsg]);
              setNewMessage("");
              setAttachment(null);
              setUploadProgress(null); // Reset progress after sending

              setTimeout(() => {
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg))
                );
              }, 1000);
            });
          }
        );
      } catch (error) {
        setError("Error uploading file");
        console.error(error);
      }
    } else {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "self",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sending",
        avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
        attachment: attachment,
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");
      setAttachment(null);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg))
        );
      }, 1000);
    }
  };

  return (
    <div className="w-[350px] h-[500px] sm:w-[450px] max-h-[500px] bg-white shadow-lg rounded-lg flex flex-col space-y-6 p-4">
      <ChatHeader onlineStatus={onlineStatus} onClose={onClose} lastLoginTime={lastLoginTime ? lastLoginTime : ""} />
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
        className="p-1"
        newMessage={newMessage}
        onMessageChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        onFileSelect={(e) => {
          const file = e.target.files[0];
          if (file) {
            setAttachment({ name: file.name, file, url: URL.createObjectURL(file), type: file.type });
          }
        }}
        onSend={handleSend}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default ChatBox;
