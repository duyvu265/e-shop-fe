import React from "react";
import { FiPaperclip } from "react-icons/fi";

const AttachmentPreview = ({ attachment, onRemove }) => (
  <div className="p-2 border-t">
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
      <div className="flex items-center space-x-2">
        <FiPaperclip className="text-gray-500" />
        <span className="text-sm truncate">{attachment.name}</span>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700">
        ×
      </button>
    </div>
  </div>
);

export default AttachmentPreview;
