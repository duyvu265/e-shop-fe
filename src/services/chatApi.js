// import apiClient from "./apiClient";

// export const fetchChatSessionsFromAPI = async (signal) => {
//   try {
//     const response = await apiClient.get("/chat/sessions", { signal });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data || error.message);
//   }
// };

// export const sendMessageToAPI = async (messageData) => {
//   try {
//     const response = await apiClient.post(`/chat/messages/${messageData.chatSessionId}/`, messageData);
//     return { data: response.data, status: response.status >= 200 && response.status < 300 };
//   } catch (error) {
//     throw new Error(error.response?.data || error.message);
//   }
// };

// export const updateTypingStatusInAPI = async (statusData) => {
//   try {
//     const response = await apiClient.post(`/chat/typing/${statusData.chatSessionId}/`, statusData);
//     return { data: response.data, status: response.status >= 200 && response.status < 300 };
//   } catch (error) {
//     throw new Error(error.response?.data || error.message);
//   }
// };
