import { useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { NotifyError } from "../components/Toasts/Notifies";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cookie")
    console.log(cookies);
  }, [cookies]);
  
  const login = async (data, onSend) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/moderador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if(res.token){
        setCookie('auth', JSON.stringify(res), { path: '/' });
        navigate("/dashboard");
      }else{
        NotifyError(res.msg)
        console.log(res.msg)
      }

    } catch (error) {
      console.error(error);
    }
  };
  
  const logOut = () => {
    try {
      removeCookie('auth');
      navigate("/mod/login");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ cookies, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
