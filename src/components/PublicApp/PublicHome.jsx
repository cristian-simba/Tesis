import React, { useEffect, useState } from 'react';
import { getPublicaciones } from '../../api/publicaciones.api';
import PublicacionesList from './PublicacionesList';
import { Spinner } from '@radix-ui/themes';

function PublicHome() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublicaciones = async () => {
      try {
        const response = await getPublicaciones();
        console.log(response);
        setPublicaciones(response.data);
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
        <Spinner />
      ) : (
        publicaciones.length > 0 ? (
          <PublicacionesList publicaciones={publicaciones} />
        ) : (
          <div>No hay publicaciones disponibles.</div>
        )
      )}
    </div>
  );
}

export default PublicHome;