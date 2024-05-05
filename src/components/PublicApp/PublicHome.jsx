import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
import { getPublicaciones } from '../../api/publicaciones.api';
import PublicacionesList from './PublicacionesList';
import { Spinner } from '@radix-ui/themes';

function PublicHome() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    async function loadPublicaciones(){
      const response =  await getPublicaciones()
      console.log(response);
      setPublicaciones(response.data)
    }
    loadPublicaciones()
  }, []);

  return (
    <div className='pt-24 px-16'>
      {/* <Spinner size='3' className='flex items-center justify-center min-h-8'/> */}
      <PublicacionesList publicaciones={publicaciones} />
    </div>
  
);
}

export default PublicHome
