import { useEffect, useRef } from "react";
import CryptoJS from 'crypto-js';

const apiUrl = import.meta.env.VITE_API_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const useWebSocket = (chatSessionId, onMessage) => {
  const socketRef = useRef(null);

  // Giải mã token từ localStorage
  const getDecryptedToken = (key) => {
    const encryptedToken = localStorage.getItem(key);
    if (!encryptedToken) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedToken;
    } catch (error) {
      console.error(`Error decrypting token (${key}):`, error);
      return null;
    }
  };

  useEffect(() => {
    const token = getDecryptedToken('accessToken');
    if (!token) {
      console.error('No token available');
      return;
    }

    const socket = new WebSocket(`${apiUrl}/ws/chat/${chatSessionId}/?token=${token}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("New message:", data.message);
      if (onMessage) onMessage(data);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      socket.close();
    };
  }, [chatSessionId, onMessage]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};

export default useWebSocket;
