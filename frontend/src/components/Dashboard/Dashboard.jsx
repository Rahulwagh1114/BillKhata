import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import Invoice from "./Invoice";
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