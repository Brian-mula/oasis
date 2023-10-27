import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { login, isLogingIn } = useLogin();
  const {login,isLoading,localUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(localUser){
      navigate('/dashboard');
    }
  }, [localUser,navigate])

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    
    await login({ email, password });
    navigate('/dashboard', {replace: true});
   

  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="w-full max-w-md mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center items-center">
              <img src="/logo-light.png" alt="" className="h-32 w-32 rounded-md object-cover" />
          </div>
          <h1 className="text-center font-bold text-lg py-2">Log in to your account</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
             
              {`${isLoading ? <SpinnerMini /> : "Login"}`}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Brian Mulati. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
