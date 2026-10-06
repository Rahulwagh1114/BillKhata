import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
function Dashboard(){
    return(
       <div className="dashboardLayout">
      <Sidebar />
      <Hero />
    </div>
       
        
    )
}
export default Dashboard;