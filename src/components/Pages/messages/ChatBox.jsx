import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AttachmentPreview from "./AttachmentPreview";
import ErrorMessage from "./ErrorMessage";
import InputArea from "./InputArea";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How are you?",
      sender: "other",
      timestamp: "09:30 AM",
      status: "read",
      avatar: "images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    {
      id: 2,
      text: "I'm doing great! Thanks for asking.",
      sender: "self",
      timestamp: "09:31 AM",
      status: "delivered",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 3,
      text: "I'm doing great! Thanks for asking.",
      sender: "self",
      timestamp: "09:31 AM",
      status: "delivered",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 4,
      text: "I'm doing great! Thanks for asking.",
      sender: "self",
      timestamp: "09:31 AM",
      status: "delivered",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 5,
      text: "I'm doing great! Thanks for asking.",
      sender: "self",
      timestamp: "09:31 AM",
      status: "delivered",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState("online");

  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "" && !attachment) return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "self",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
      attachment: attachment
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachment(null);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <ChatHeader onlineStatus={onlineStatus} onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[400px]">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
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
            setAttachment({ name: file.name, url: URL.createObjectURL(file), type: file.type });
          }
        }}
        onSend={handleSend}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default ChatBox;
