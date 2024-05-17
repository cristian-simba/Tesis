// VerifyToken.js
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { comprobarToken } from '../../api/moderador.api';

const VerifyToken = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await comprobarToken(token);
        navigate(`/nueva-contraseña/${token}`);
      } catch (error) {
        navigate('/login');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return <div>Verificando token...</div>;
};

export default VerifyToken;
