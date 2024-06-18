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
    }, 2000);
  }, []);
  
  return (
    <>
      <PublicNavbar/>
      <PublicHome/>
    </>
  );
}

export default PublicApp