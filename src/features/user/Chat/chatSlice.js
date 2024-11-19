import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchChatSessions = createAsyncThunk('chat/fetchChatSessions', async () => {
  const data = await chatApi.getChatSessions();  
  return data;
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (messageData) => {
  const data = await chatApi.sendMessageApi(messageData);  
  return data;
});

export const updateTypingStatus = createAsyncThunk('chat/updateTypingStatus', async (statusData) => {
  const data = await chatApi.updateTypingStatusApi(statusData);  
  return data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatSessions: [],
    messages: {},
    typingStatus: {},
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const { chatSessionId, message } = action.payload;
      if (!state.messages[chatSessionId]) {
        state.messages[chatSessionId] = [];
      }
      state.messages[chatSessionId].push(message);
    },
    clearMessages: (state, action) => {
      const { chatSessionId } = action.payload;
      state.messages[chatSessionId] = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.chatSessions = action.payload;
      })
      .addCase(fetchChatSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatSessionId, message } = action.payload;
        if (!state.messages[chatSessionId]) {
          state.messages[chatSessionId] = [];
        }
        state.messages[chatSessionId].push(message);
      })
      .addCase(updateTypingStatus.fulfilled, (state, action) => {
        const { user, chatSession, isTyping } = action.payload;
        state.typingStatus[chatSession] = { user, isTyping };
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
