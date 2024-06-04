import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Flex, Spinner } from '@radix-ui/themes';

const ConfirmarCuenta = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`);
        setMensaje(response.data.msg);
        setError(false);
      } catch (error) {
        setMensaje(error.response.data.msg);
        setError(true);
      } finally {
        setLoading(false)
      }
    };

    confirmarCuenta();
  }, [token]);

  return (
    <>
    {loading ? (
      <Flex justify='center' align='center' className='min-h-screen'>
        <Spinner />
      </Flex>
      ) :(
      <div className="flex items-center justify-center pt-20">
        <div className={`p-6 rounded-lg shadow-lg flex items-center space-x-4 ${error ? 'bg-red-10  0' : 'bg-green-100'}`}>
          {error ? <FaTimes color='red' /> : <FaCheck color='green' />}
          <div className="text-lg font-semibold text-gray-700">
            {mensaje}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ConfirmarCuenta;
