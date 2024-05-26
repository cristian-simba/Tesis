import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { NotifyError } from "../components/Toasts/Notifies";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const navigate = useNavigate();
  
  const login = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/moderador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      const res = await response.json();
      if(res.msg === "Es necesario cambiar su contraseña por primera vez"){
        navigate("/cambiar-contraseña");
      }
    
      if(res.token){
        setCookie('auth', JSON.stringify(res), { path: '/' });
        navigate("/dashboard");
      }else{
        NotifyError(res.msg)
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // const logOut = () => {
  //   try {
  //     document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //     console.log("Cookie 'auth' eliminada correctamente.");
  //     navigate("/mod/login");
  //   } catch (error) {
  //     console.error("Error al intentar eliminar la cookie:", error);
  //   }
  // };
  const logOut = () => {
    try {
      setCookie('auth', '', { expires: new Date(0), path: '/' });
      console.log("Cookie 'auth' eliminada correctamente.");
      navigate("/mod/login");
    } catch (error) {
      console.error("Error al intentar eliminar la cookie:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ cookies, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
