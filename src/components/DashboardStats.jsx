import { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { UserContext } from "../users/UserProvider";
import { IoDocumentText } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import Card from "./Card";
import { PostContext } from "../posts/PostProvider";
import { Link } from "react-router-dom";


export default function DashboardStats(){
  const { state: userState } = useContext(UserContext);
  const { state: postState } = useContext(PostContext);
  return(
    <div className="dashboard-stats">
      <div className="flex w-full">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="bg-white">Export Data</button>
          <Link to="create-post" className="inline-flex place-items-center bg-[#001BB7] text-white">
            <GoPlus/>
            New Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card  icon={<IoDocumentText/>} title="Total Posts" value={postState.posts}/>
        <Card  icon={<MdOutlinePublishedWithChanges/>} title="Published" value={postState.published}/>
        <Card  icon={<RiDraftFill/>} title="Drafts" value={postState.drafts}/> 
        <Card  icon={<FaUserGroup/>} title="Users" value={userState.totalUsers}/>
      </div>
    </div>
  );
}