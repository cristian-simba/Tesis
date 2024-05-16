import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  
  const auth_ID = import.meta.env.VITE_MODERADOR_ID;  
  const user = useAuth();

  if (user.cookies.auth._id !== auth_ID) {
    return <Navigate to='/dashboard' />;
  }
  return children ? children : <Outlet />;
}
