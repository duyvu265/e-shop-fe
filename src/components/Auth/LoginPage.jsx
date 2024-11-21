import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaQuestionCircle } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import * as jwt_decode from "jwt-decode";
import { loginSuccess, setIsLoggedIn } from "../../features/user/userSlice/UserSlice";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          dispatch(loginSuccess({ accessToken }));
          dispatch(setIsLoggedIn(true));
          navigate("/");
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    if (!validateEmail(email) || password.length < 8) {
      setErrors({
        email: !validateEmail(email) ? "Email không hợp lệ." : "",
        password: password.length < 8 ? "Mật khẩu phải có ít nhất 8 ký tự." : "",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/login/`, { email, password });

      if (response.data && response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        toast.success("Đăng Nhập thành công!");
        navigate("/");
      } else {
        toast.error("Dữ liệu phản hồi không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình xác thực:", error);
      toast.error(error.response?.data?.error || "Có lỗi xảy ra! Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const response = await axios.post(`${apiUrl}/google-login/`, { idToken });

      if (response.data && response.data.userInfo) {
        dispatch(loginSuccess(response.data));
        toast.success("Đăng Nhập bằng Google thành công!");
        navigate("/");
      } else {
        toast.error("Thông tin người dùng không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập bằng Google:", error);
      toast.error(error.response?.data?.error || "Có lỗi xảy ra khi đăng nhập bằng Google!");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng nhập vào tài khoản của bạn</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="relative mb-4">
              <label htmlFor="email" className="sr-only">Địa chỉ email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Địa chỉ email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10`}
                placeholder="Mật khẩu"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent p-0 border-0 focus:outline-none hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-700" />
                ) : (
                  <FaEye className="text-gray-700" />
                )}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Ghi nhớ tôi</label>
            </div>
            <div className="text-sm">
              <a href="/forget-password" className="font-medium text-indigo-600 hover:text-indigo-500">Quên mật khẩu?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <BiLoader className="animate-spin w-5 h-5 mr-3" /> : "Đăng Nhập"}
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-center space-x-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Có lỗi xảy ra khi đăng nhập bằng Google!")}
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-600">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/register")}
            >
              Tạo tài khoản
            </button>
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <a href="/Help-Center" className="hover:text-gray-900 flex items-center">
            <FaQuestionCircle className="mr-1" /> Trung tâm trợ giúp
          </a>
          <span>•</span>
          <a href="/Privacy-Policy" className="hover:text-gray-900">
            Chính sách bảo mật
          </a>
          <span>•</span>
          <a href="#" className="hover:text-gray-900">
            Điều khoản
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
