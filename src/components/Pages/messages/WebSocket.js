import { useEffect, useRef } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const useWebSocket = (chatSessionId, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const socket = new WebSocket(
      `${apiUrl}/ws/chat/${chatSessionId}/?token=${token}`
    );

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
