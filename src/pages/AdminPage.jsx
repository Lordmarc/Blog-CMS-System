
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import ManagePosts from "../components/ManagePosts";
import PostForm from "../components/PostForm";

export default function AdminPage(){

  return(
     <div className="flex min-h-screen w-full">

      <div className="flex-1 w-full flex">
        <Sidebar/>
        <div className="flex-1">
            <Routes>
            <Route path="" element={ <Dashboard/>}/>
              <Route path="create-post"  element={<PostForm/>} />
            <Route path="manage-posts">
              <Route index  element={<ManagePosts/>}/>
              <Route path="create-post" element={<PostForm/>}/>
            </Route>
          
          </Routes>
        </div>
     
      </div>
     </div>
  );
}