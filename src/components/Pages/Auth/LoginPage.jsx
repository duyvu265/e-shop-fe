import { useState, useEffect } from 'react';
import logoIcon from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../features/user/userSlice/UserSlice';

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
  
      if (response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        toast.success(`${signState === "Sign In" ? "Đăng Nhập" : "Đăng Ký"} thành công!`);
        if (response.data.userInfo.user_type === "admin") {         
          navigate('admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Thông tin người dùng không hợp lệ!");
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

      if (response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        console.log(response.data);
        
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        toast.success("Đăng Nhập bằng Google thành công!");
        navigate('/');
      } else {
        toast.error("Thông tin người dùng không hợp lệ!");
      }
    } catch (error) {
      console.error("Error during Google Sign In:", error.response?.data || error.message);
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
          <button className="w-full h-12 bg-blue-500 text-white rounded mt-5 hover:bg-blue-600">
            {signState === "Sign In" ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
            {signState === "Sign In" && (
              <div className="flex items-center gap-1">
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4"
                />
                <label>Remember Me</label>
              </div>
            )}
            <p>Need Help?</p>
          </div>
        </form>
        <div className="mt-10 text-gray-700 text-center">
          {signState === "Sign In" ? (
            <p>Mới đến Shop? <span onClick={() => setSignState("Sign Up")} className="text-blue-600 cursor-pointer font-medium">Đăng Ký Ngay</span></p>
          ) : (
            <p>Đã có tài khoản? <span onClick={() => setSignState("Sign In")} className="text-blue-600 cursor-pointer font-medium">Đăng Nhập Ngay</span></p>
          )}
        </div>
        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error("Có lỗi xảy ra khi đăng nhập bằng Google!");
            }}
          />
          <button className="w-full h-12 bg-blue-700 text-white rounded mt-2 hover:bg-blue-800">F...</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
