import React from 'react';
import { Text } from "@radix-ui/themes";
import Masonry from '@mui/lab/Masonry';

function PublicacionesList({ publicaciones }) {


  return (
    <Masonry columns={5} spacing={2}>
      {publicaciones.map(publicacion => (
        <div key={publicacion._id} className='bg-cover'>
          <img src={publicacion.imagen.secure_url} className='rounded-lg mb-2' />   
          <Text>{publicacion.descripcion}</Text>
        </div>
      ))}
    </Masonry>
  );
}

export default PublicacionesList;
