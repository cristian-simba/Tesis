import React, { useState, useEffect } from 'react';
import useAuth from "../../context/useAuth";
import ModeratorDialog from "./ModeratorDialog";
import { ToastContainer } from 'react-toastify';

export default function Moderadores() {
  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <ModeratorDialog id={id} token={token} />
      <ToastContainer />
    </div>
  );
}
