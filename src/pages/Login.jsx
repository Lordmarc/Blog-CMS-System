import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const showPassword = () => setIsShow(!isShow);

  const handleLogin = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    // ✅ Wala nang dispatch dito — AuthProvider na ang bahala
    // ✅ Wala nang navigate dito — let AuthProvider handle the state

  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err.message || "Invalid Credentials" });
  }
};

  if (state.isAuthenticated) {
    return state.user?.role === "admin" ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
  }
  return (
    <div className="login-container">
      <form className="login" onSubmit={handleLogin}>
        {state.error && <p>{state.error}</p>}
        <div className="w-full text-center">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Manage your developer account and blog posts</p>
        </div>

        <div className="login-input">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="login-input">
          <label>Password</label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              type={isShow ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-none outline-none w-full"
              placeholder="Enter your password"
            />
            {isShow ? (
              <FaEyeSlash onClick={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            ) : (
              <FaEye onClick={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            )}
          </div>
        </div>

        <button type="submit" className="login-btn my-4">Sign In</button>
        <div className="flex items-center gap-1">
          <p>Don't have an account? </p>
          <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
}