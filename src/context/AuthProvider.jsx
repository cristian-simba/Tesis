import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    console.log(cookies);
  }, [cookies]);
  

  const login = async (data) => {
    try {
      const response = await fetch(`https://ropdat.onrender.com/api/login/moderador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      setAuth(res);
      setCookie('auth', JSON.stringify(res), { path: '/' });
      navigate("/home");

    } catch (err) {
      console.error(err);
    }
  };
  
  const logOut = () => {
    setAuth({});
    removeCookie('auth');
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};