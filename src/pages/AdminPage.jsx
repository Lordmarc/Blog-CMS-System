
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import ManagePosts from "../components/ManagePosts";

export default function AdminPage(){

  return(
     <div className="flex min-h-screen h-full w-full">
      <Sidebar/>
      <div className="flex-1">
      
        <Routes>
          <Route path="" element={ <Dashboard/>}/>

          <Route path="manage-posts"  element={<ManagePosts/>}/>
        </Routes>
      </div>
     </div>
  );
}