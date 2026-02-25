import { useContext, useEffect, useState } from "react";
import { VscTerminalCmd } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";



export default function Navbar(){
  const { state, dispatch } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768){
        setMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])
  return(
    <nav className="navbar-wrapper">
      <div className="navbar">
          <div className="flex gap-2">
          <div className="p-2 rounded-md bg-[#001BB7] text-white font-semibold">
          <VscTerminalCmd/>
          </div>
          <h2 className="text-2xl font-semibold hidden md:block">MarCode</h2>
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
        {menuOpen == false &&
          <div className="md:hidden">
          <button onClick={() => setMenuOpen( !menuOpen )}>
            {menuOpen ? <IoClose size={24}/> : <IoIosMenu size={24}/>}
          </button>
        </div> }
      
      </div>
      
      {menuOpen && (
        <div className="bg-white fixed h-screen flex flex-col right-0 top-0 z-10 w-40 p-4">
          <div className="mb-10">
          {menuOpen && <IoClose onClick={() => setMenuOpen(!menuOpen)} size={24}/> }
          </div>
        
          <ul className=" flex flex-col w-full  gap-2">
        
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
            {state.isAuthenticated ? (
              <li onClick={handleLogout}>Logout</li>
            ): (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                <li className=""><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
              </>
        
            )}
          </ul>
        </div>
    
      )}

    </nav>
  )
}