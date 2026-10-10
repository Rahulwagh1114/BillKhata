import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function Dashboard(){
    return(
       <div className="dashboardLayout">
      <Sidebar />
      <Outlet />
    </div>
       
    )
}
export default Dashboard;