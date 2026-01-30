import { useContext } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { VscTerminalCmd } from "react-icons/vsc";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Posts", path: "/dashboard/manage-posts", icon: <BiSolidDetail /> },
  ];
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="flex items-center gap-2">
        <div className="p-2 h-auto rounded-md bg-[#001BB7] text-white font-semibold shadow-[#001BB7] shadow-sm">
          <VscTerminalCmd className="text-2xl" />
        </div>
        <div>
          <h2 className="text-md font-semibold">MarCode</h2>
          <p className="text-gray-500 text-xs font-semibold">ADMIN CONTROL</p>
        </div>
      </div>
      <ul className="w-full">
        {links.map((link) => (
          <li key={link.path} className="w-full">
            <NavLink
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full px-2 py-2 rounded text-md font-semibold ${isActive ? "bg-[#001BB7]  text-white " : "text-gray-600 hover:bg-gray-300"}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        className="flex w-full items-center  mt-auto gap-1 cursor-pointer hover:bg-red-400"
        onClick={handleLogout}
      >
        <CiLogout />
        Logout
      </div>
    </div>
  );
}
