const chatSessionId = 'your_chat_session_id';
const token = localStorage.getItem('accessToken');  

const socket = new WebSocket(`ws://localhost:8000/ws/chat/${chatSessionId}/?token=${token}`);

socket.onopen = () => {
  console.log('Connected to WebSocket');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New message:', data.message);
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket');
};

socket.send(JSON.stringify({
  'message': 'Hello World!',
}));
