import React from "react";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

const MessageStatus = ({ status }) => {
  switch (status) {
    case "sent":
      return <FiCheck className="text-gray-500" />;
    case "delivered":
      return <FiCheckCircle className="text-blue-500" />;
    case "read":
      return <FiCheckCircle className="text-green-500" />;
    default:
      return null;
  }
};

const Message = ({ message }) => (
  <div className={`flex ${message.sender === "self" ? "justify-end" : "justify-start"}`}>
    <div
      className={`flex items-end space-x-2 max-w-[70%] ${
        message.sender === "self" ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      <img src={`https://${message.avatar}`} alt="Avatar" className="w-8 h-8 rounded-full" />
      <div
        className={`rounded-lg p-3 ${
          message.sender === "self" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.text}
        {message.attachment && (
          <div className="mt-2">
            {message.attachment.type.startsWith("image/") ? (
              <img src={message.attachment.url} alt="attachment" className="max-w-xs rounded" />
            ) : (
              <div className="bg-white bg-opacity-10 p-2 rounded">
                📎 {message.attachment.name}
              </div>
            )}
          </div>
        )}
        <div className="text-xs mt-1 flex items-center justify-end space-x-1">
          <span>{message.timestamp}</span>
          {message.sender === "self" && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  </div>
);

export default Message;
