import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
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
    <div>
      <PublicacionesList publicaciones={publicaciones} />
    </div>
  
);
}

export default PublicHome
