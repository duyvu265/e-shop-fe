import React from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";

const InputArea = ({
  newMessage,
  onMessageChange,
  onKeyPress,
  onFileSelect,
  onSend,
  fileInputRef,
}) => (
  <div className="border-t">
    <div className="flex items-center space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
      />
      <button onClick={() => fileInputRef.current.click()} className="text-gray-500 hover:text-gray-700" aria-label="Attach file">
        <FiPaperclip className="w-5 h-5" />
      </button>
      <input
        type="text"
        value={newMessage}
        onChange={onMessageChange}
        onKeyPress={onKeyPress}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
        aria-label="Message input"
      />
      <button onClick={onSend} className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Send message">
        <FiSend className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default InputArea;
