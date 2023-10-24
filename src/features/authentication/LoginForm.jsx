import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,islogingIn} = useLogin();

  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return;
    login({email,password});
  }

  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="flex justify-center items-center pt-3">
            <img src="/logo-light.png" alt="" className="h-32 w-32 rounded-md object-cover" />
        </div>
        <h1 className="text-center font-bold py-1 capitalize text-lg">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              value={email}
              disabled={islogingIn}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={password}
              disabled={islogingIn}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" disabled={islogingIn} className="btn btn-primary">{`${islogingIn ? <SpinnerMini/> : 'Login'}`}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default LoginForm;
