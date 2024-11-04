import { useState, useEffect } from 'react';
import logoIcon from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess, setIsLoggedIn } from '../../../features/user/userSlice/UserSlice';
import * as jwt_decode from 'jwt-decode';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        console.log(decodedToken);      
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp > currentTime) {
          dispatch(loginSuccess({ accessToken })); 
          dispatch(setIsLoggedIn(true));
          navigate('/'); 
        } else {
          console.log("Token đã hết hạn");
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem('accessToken');
      }
    }
  }, []);
  


  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail) {
      setEmail(savedEmail);
      setPassword(savedPassword || '');
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
  
    try {
      const endpoint = signState === "Sign In" ? `${apiUrl}/login/` : `${apiUrl}/register/`;
      const data = signState === "Sign Up"
        ? { username: name, email, password }
        : { email, password };
  
      const response = await axios.post(endpoint, data);
  
      if (response.data && response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        toast.success(`${signState === "Sign In" ? "Đăng Nhập" : "Đăng Ký"} thành công!`);
        if (signState === "Sign Up") {
          navigate('/login'); 
        } else {
          navigate('/'); 
        }
      } else {
        toast.error("Dữ liệu phản hồi không hợp lệ.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error(error.response?.data?.error || "Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };
  

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const response = await axios.post(`${apiUrl}/google-login/`, { idToken });

      if (response.data && response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        toast.success("Đăng Nhập bằng Google thành công!");
        navigate('/');
      } else {
        toast.error("Thông tin người dùng không hợp lệ!");
      }
    } catch (error) {
      console.error("Error during Google Sign In:", error);
      toast.error(error.response?.data?.error || "Có lỗi xảy ra khi đăng nhập bằng Google!");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-400 to-blue-200 p-5 md:p-20" style={{ backgroundImage: "url(/background_banner.jpg)" }}>
      <img src={logoIcon} className="w-36 mx-auto mb-8" alt="Logo" />
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg p-10 mx-auto shadow-lg">
        <h1 className="text-2xl font-medium mb-7 text-blue-600">{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && (
            <input
              type='text'
              placeholder='Your name'
              className="w-full h-12 bg-gray-200 text-black mb-3 rounded px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type='email'
            placeholder='Email'
            className="w-full h-12 bg-gray-200 text-black mb-3 rounded px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className="w-full h-12 bg-gray-200 text-black mb-3 rounded px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="inline-flex items-center mb-3">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="ml-2">Remember me</span>
          </label>
          <button type='submit' className="bg-blue-600 text-white w-full h-12 rounded-md mb-3">{signState}</button>
        </form>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.error("Google Sign In failed");
            toast.error("Có lỗi xảy ra khi đăng nhập bằng Google!");
          }}
        />
        <p className="mt-4 text-center cursor-pointer" onClick={() => setSignState(signState === "Sign In" ? "Sign Up" : "Sign In")}>
          {signState === "Sign In" ? "Create an account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
};

export default Login;
