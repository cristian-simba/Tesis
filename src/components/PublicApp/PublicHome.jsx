import React, { useEffect, useState } from 'react';
import { getPublicaciones } from '../../api/publicaciones.api';
import PublicacionesList from './PublicacionesList';

function PublicHome() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const loadPublicaciones = async() =>{
      try {
        const response =  await getPublicaciones();
        console.log(response);
        setPublicaciones(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadPublicaciones();
  }, []);

  return (
    <div className='py-20'>
      <PublicacionesList publicaciones={publicaciones} />
    </div>
  
);
}

export default PublicHome
