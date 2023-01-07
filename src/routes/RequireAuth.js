import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const useAuth = ()=>{
  const user=localStorage.getItem("access_token");
  if(user){
    return true;
  }else{
    return false;
  }
}
const RequireAuth = (props) => {
  const authed = useAuth()
  const location = useLocation();

  return (
  authed ? < Outlet/> : <Navigate to="/login" replace state={{from: location}}/>
)}

export default RequireAuth;
