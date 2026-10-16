import { Navigate,Outlet } from "react-router-dom";

function ProtectedRoutes(){
    const token=localStorage.getItem("accessToken")
    
    if(!token){
        return <Navigate to="/" replace />
    }
    return <Outlet/>
}
export default ProtectedRoutes;