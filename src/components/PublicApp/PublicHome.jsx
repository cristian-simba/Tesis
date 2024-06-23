import React, { useEffect, useState } from 'react';
import { getPublicaciones } from '../../api/publicaciones.api';
import PublicacionesList from './PublicacionesList';
import { Spinner, Flex, Text } from '@radix-ui/themes';
import { RiFileShield2Line } from "react-icons/ri";

function PublicHome() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublicaciones = async () => {
      try {
        const response = await getPublicaciones();
        console.log(response);
        setPublicaciones(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadPublicaciones();
  }, []);

  return (
    <div className='py-20'>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <Spinner />
        </div>
      ) : (
        publicaciones.length > 0 ? (
          <PublicacionesList publicaciones={publicaciones} />
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <Text>No hay publicaciones disponibles.</Text>
          </div>

        )
      )}
    </div>
  );
}

export default PublicHome;