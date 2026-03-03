import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register(){
  const { state, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);



  const showPassword = () => {
    setIsShow(!isShow);
  }

  const handleRegister = async (e) => {
  e.preventDefault();
  console.log("handleRegister called"); 
 const { error } = await supabase.auth.signUp({
  email,
  password
});



  // ✅ i-check muna ang error
  if (error) {
    alert(error.message);
    return; // ✅ stop agad
  }


  alert("Check your email for confirmation!");
};


  

  return(
    <div className="login-container">
      <form className="login" onSubmit={handleRegister}>
          {state.error && <p>{state.error}</p>}
          <div className="w-full text-center">
            <h2 className="text-2xl font-semibold">Create your account</h2>
          
          </div>

          <div className="login-input">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
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
          
          <button className="login-btn my-4" type="submit">Sign Up</button>

          <hr className="h-1 w-full" />
          
          <div className="flex gap-1 items-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link className="text-[#001BB7] font-semibold">Sign in</Link>
          </div>
          
        </form>
    </div>
    
  );
}