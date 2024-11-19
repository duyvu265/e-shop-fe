import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AttachmentPreview from "./AttachmentPreview";
import ErrorMessage from "./ErrorMessage";
import InputArea from "./InputArea";
import axios from "axios"; // Đảm bảo đã cài axios để xử lý upload file

const ChatBox = ({ onClose, chatSessionId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const lastLoginTime = 0;
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${chatSessionId}/`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('New message from WebSocket:', data.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, sender: "admin", timestamp: new Date().toLocaleTimeString() },
      ]);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      socket.close();
    };
  }, [chatSessionId]);

  const handleSend = async (attachmentUrl) => {
    if (newMessage.trim() === "" && !attachment) return;

    let attachmentToSend = null;

    // Nếu có attachment, thực hiện upload
    if (attachment) {
      try {
        const formData = new FormData();
        formData.append("file", attachment);
        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        attachmentToSend = uploadResponse.data.url; // Giả sử API trả về URL file đã upload
      } catch (err) {
        setError("Failed to upload attachment");
        return;
      }
    }

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "self",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
      attachment: attachmentToSend ? { url: attachmentToSend } : null,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachment(null);
    setUploadProgress(null);

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ message: newMessage, attachment: attachmentToSend }));
    }

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg))
      );
    }, 1000);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[350px] h-[500px] sm:w-[450px] max-h-[500px] bg-white shadow-lg rounded-lg flex flex-col space-y-6 p-4">
      <ChatHeader onlineStatus="online" onClose={onClose} lastLoginTime={lastLoginTime ? lastLoginTime : ""} />
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
        onFileSelect={(file) => setAttachment(file)}
        onSend={handleSend}
        fileInputRef={fileInputRef}
        setUploadProgress={setUploadProgress}
        setError={setError}
        setAttachment={setAttachment}
      />
    </div>
  );
};

export default ChatBox;
