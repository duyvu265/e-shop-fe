import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaTwitter, FaQuestionCircle } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice/UserSlice";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        if (!validateEmail(value) && value) {
          newErrors.email = "Định dạng email không hợp lệ";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (value.length < 8 && value) {
          newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
        } else {
          delete newErrors.password;
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Mật khẩu không khớp";
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Mật khẩu không khớp";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "username":
        if (!value.trim()) {
          newErrors.username = "Tên người dùng là bắt buộc";
        } else {
          delete newErrors.username;
        }
        break;
      default:
        if (!value.trim()) {
          newErrors[name] = "Trường này là bắt buộc";
        } else {
          delete newErrors[name];
        }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    const { first_name, last_name, username, email, password } = formData;

    try {
      const response = await axios.post(`${apiUrl}/register/`, {
        first_name,
        last_name,
        username,
        email,
        password
      });

      if (response.data && response.status === 201) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      toast.error(error.response?.data?.error || "Có lỗi xảy ra khi đăng ký!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
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

  const handleGoogleLoginFailure = (error) => {
    console.error("Đăng nhập Google thất bại:", error);
    toast.error("Đăng nhập qua Google thất bại.");
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Tạo tài khoản của bạn</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first_name" className="sr-only">Tên</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Tên"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1 mb-2">{errors.first_name}</p>
                )}
              </div>
              <div>
                <label htmlFor="last_name" className="sr-only">Họ</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Họ"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1 mb-2">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="sr-only">Tên người dùng</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Tên người dùng"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 mb-2">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Địa chỉ email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Địa chỉ email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 mb-2">{errors.email}</p>
              )}
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Mật khẩu"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent p-0 border-0 focus:outline-none hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 mb-2">{errors.password}</p>
              )}
            </div>

            <div className="relative mb-4">
              <label htmlFor="confirmPassword" className="sr-only">Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Xác nhận mật khẩu"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent p-0 border-0 focus:outline-none hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 mb-2">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-70"
            >
              {isLoading ? (
                <BiLoader className="animate-spin h-5 w-5" />
              ) : (
                "Đăng ký"
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                useOneTap
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <FaGoogle className="text-xl" />
              </GoogleLogin>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <FaFacebook className="text-xl" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <FaTwitter className="text-xl" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </a>
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

export default SignUpPage;
