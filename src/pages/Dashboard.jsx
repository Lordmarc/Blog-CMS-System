
import AdminNavbar from "../components/AdminNavbar";
import DashboardStats from "../components/DashboardStats";
import QuickDraft from "../components/QuickDraft";
import RecentActivity from "../components/RecentActivity";
import Sidebar from "../components/Sidebar";

export default function Dashboard(){
  return(
  <div>
      
      <DashboardStats/>
      <div className="flex px-8 gap-4">
        <RecentActivity/>
        <QuickDraft/>
      </div>
  </div>

  );
}