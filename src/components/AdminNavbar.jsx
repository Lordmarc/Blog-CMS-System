import { useContext } from "react";
import { VscTerminalCmd } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import ProfileIcon from "./ProfileIcon";


export default function AdminNavbar(){
  const { state, dispatch } = useContext(AuthContext);

 
  return(
    <nav className="navbar-wrapper">
      <div className="w-full flex p-4">

      <div className="flex items-center font-semibold ml-auto gap-2">
        <div className="flex flex-col">
          <p className="m-0">{state.user?.name}</p>
          <p className="text-gray-500 text-sm -mt-1">{state.user?.role}</p>
        </div>
        <div className="rounded-full h-10 w-10">
          <ProfileIcon/>
        </div>
      </div>

      </div>
    </nav>
  )
}