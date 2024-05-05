import React from 'react'
import { useState, useEffect } from 'react';
import PublicNavbar from '../../components/PublicApp/PublicNavbar'
import PublicHome from '../../components/PublicApp/PublicHome'
import { Spinner } from '@radix-ui/themes';

function PublicApp() {

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  }, []);
  
  return (
    <>
      <PublicNavbar/>
      {!loader ? (
        <div className='flex justify-center items-center h-screen'>
          <Spinner size='3' />
        </div>
      ) : (
        <div>
          <PublicHome/>
        </div>
      )}
    </>
  );
}

export default PublicApp