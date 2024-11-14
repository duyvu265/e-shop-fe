import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const ErrorMessage = ({ error, onRetry }) => (
  <div className="bg-red-100 text-red-600 p-3 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <FiAlertCircle />
      <span>{error}</span>
    </div>
    <button onClick={onRetry} className="text-red-600 hover:text-red-800">
      Retry
    </button>
  </div>
);

export default ErrorMessage;
