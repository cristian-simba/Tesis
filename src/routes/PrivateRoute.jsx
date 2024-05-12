import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth"

export default function PrivateRoute() {
  const user = useAuth();
  if(!user?.cookies?.auth?.token) return <Navigate to= '/mod/login'/>
  return <Outlet/>
}
