import { VscTerminalCmd } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiSolidDetail } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";


export default function Sidebar() {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/')
  }
  return(
    <div className="sidebar">

      <div className="flex items-center gap-2">
        <div className="p-2 h-auto rounded-md bg-[#001BB7] text-white font-semibold shadow-[#001BB7] shadow-sm">
        <VscTerminalCmd className="text-2xl"/>
        </div>
        <div>
          <h2 className="text-md font-semibold">MarCode</h2>
          <p className="text-gray-500 text-xs font-semibold">ADMIN CONTROL</p>
        </div>
        
      </div>
      <ul>
        <li>
          <MdDashboard/>
          <Link>Dashboard</Link>
        </li>
        <li>
          <BiSolidDetail/>
          <Link>Posts</Link>
        </li>
    
      </ul>
      <div className="flex w-full items-center  mt-auto gap-1 cursor-pointer hover:bg-red-400" onClick={handleLogout}>
        <CiLogout/>
        Logout
      </div>
    </div>
  );
}