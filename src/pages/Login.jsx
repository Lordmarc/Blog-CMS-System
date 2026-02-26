import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";
import api from "../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login(){
  const { state, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();


  const showPassword = () => {
    setIsShow(!isShow);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START"});

    try{
      const res = await api.post("/login", {email, password})

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });

      res.data.user.role === "admin" ? navigate('/dashboard') : navigate('/');
    }catch(err){
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response?.data?.message || "Invalid Credentials",
      })
    }
  }

  if(state.isAuthenticated){
    return state.user?.role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/" replace />
    )
  }


  return(
    <div className="login-container">
      <form className="login" onSubmit={handleSubmit}>
          {state.error && <p>{state.error}</p>}
          <div className="w-full text-center">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Manage your developer account and blog posts</p>
          </div>

          <div className="login-input">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} requred/>
          </div>

          <div className="login-input">
            <div className="w-full flex">
              <label htmlFor="password">Password</label>
              <Link className="ml-auto text-sm text-[#001BB7] font-semibold" to>Forgot password?</Link>
            </div>
        
            <div className="relative border border-gray-300 rounded-md">
              <input className="border-none outline-none w-full" type={isShow ? 'text' : 'password'} name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
              {isShow ? (
                <>
                <FaEyeSlash onClick={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"/>
              </>
              ) : (
                <>
                  <FaEye onClick={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                </>
              )}
          
            </div>

          </div>
          
          <button className="login-btn my-4" type="submit">Sign In</button>

          <hr className="h-1 w-full" />
          
          <div className="flex gap-1 items-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link className="text-[#001BB7] font-semibold">Sign up</Link>
          </div>
          
        </form>
    </div>
    
  );
}