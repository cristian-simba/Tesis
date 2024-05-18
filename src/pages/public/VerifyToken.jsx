// VerifyToken.js
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { comprobarToken } from '../../api/moderador.api';
import { Flex,Text, Spinner} from "@radix-ui/themes";
import { NotifyError } from "../../components/Toasts/Notifies";

const VerifyToken = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await comprobarToken(token);
        navigate(`/nueva-contraseña/${token}`);
      } catch (error) {
        navigate('/mod/login');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      <Flex direction='column' justify='center' align='center' gap='4' className='min-h-screen'>
        <Spinner size='3'/>
        <Text>Verificando</Text>
      </Flex>
    </div>)
};

export default VerifyToken;
