import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './store.js';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID=import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>    
          <App />    
      </BrowserRouter>
      </GoogleOAuthProvider>;
    </ReduxProvider>
  </StrictMode>,
);
