import { useState, useEffect } from 'react';
import logoIcon from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../../firebase'; 
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }
    navigate('/');
    console.log("Submitted:", { email, password });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      navigate('/');
    } catch (error) {
      console.error("Error during Google Sign In:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-400 to-blue-200 p-5 md:p-20" style={{ backgroundImage: "url(/background_banner.jpg)" }}>
      <img src={logoIcon} className="w-36 mx-auto mb-8" alt="Logo" />
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg p-10 mx-auto shadow-lg">
        <h1 className="text-2xl font-medium mb-7 text-blue-600">{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && <input type='text' placeholder='Your name' className="w-full h-12 bg-gray-200 text-black mb-3 rounded px-4" />}
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
            <p>Mới đến Shopee? <span onClick={() => setSignState("Sign Up")} className="text-blue-600 cursor-pointer font-medium">Đăng Ký Ngay</span></p>
          ) : (
            <p>Đã có tài khoản? <span onClick={() => setSignState("Sign In")} className="text-blue-600 cursor-pointer font-medium">Đăng Nhập Ngay</span></p>
          )}
        </div>
        <div className="mt-6">
          <button onClick={handleGoogleSignIn} className="w-full h-12 bg-blue-500 text-white rounded mt-2 hover:bg-blue-600">Google</button>
          <button className="w-full h-12 bg-blue-700 text-white rounded mt-2 hover:bg-blue-800">Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
