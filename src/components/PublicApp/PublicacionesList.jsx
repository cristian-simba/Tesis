import React from 'react';
import { Text } from "@radix-ui/themes";
import Masonry from '@mui/lab/Masonry';
import { useWindowWidth } from '../../hooks/useWindowWidth';

function PublicacionesList({ publicaciones }) {

  const windowWidth = useWindowWidth();

  return windowWidth > 768 ? (
    <Masonry columns={5} spacing={2} className='px-16'>
      {publicaciones.map(publicacion => (
        <div key={publicacion._id} className='hover:cursor-pointer'>
          <img src={publicacion.imagen.secure_url} className='rounded-lg mb-2' />   
          <Text>{publicacion.descripcion}</Text>
        </div>
      ))}
    </Masonry>
  ): (
    <Masonry columns={2} spacing={2} className='px-5'>
    {publicaciones.map(publicacion => (
      <div key={publicacion._id} className='bg-cover'>
        <img src={publicacion.imagen.secure_url} className='rounded-lg mb-2' />   
        <Text>{publicacion.descripcion}</Text>
      </div>
    ))}
  </Masonry>
  )
}

export default PublicacionesList;
