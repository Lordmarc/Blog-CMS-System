import { useContext } from "react";
import { VscTerminalCmd } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function Navbar(){
  const { state, dispatch } = useContext(AuthContext);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return(
    <nav className="navbar-wrapper">
      <div className="navbar">
          <div className="flex gap-2">
          <div className="p-2 rounded-md bg-[#001BB7] text-white font-semibold">
          <VscTerminalCmd/>
          </div>
          <h2 className="text-2xl font-semibold">MarCode</h2>
        </div>
        

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          {state.isAuthenticated ? (
            <>
              <li className="cursor-pointer" onClick={handleLogout}>Logout</li>
            </>
          ): (
            <>
              <li><Link to="/login">Login</Link></li>
              <li className="primary-btn"><Link to="/register">Register</Link></li>
            </>)}
    
        </ul>
      </div>


    </nav>
  )
}