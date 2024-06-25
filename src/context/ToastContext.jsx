import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Toast from '@radix-ui/react-toast';
import './styles.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const portalRoot = document.getElementById('toast-root') || document.body;

  const showToast = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <Toast.Provider swipeDirection="right">
          <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
            <Toast.Title className="ToastTitle">Notificación</Toast.Title>
            <Toast.Description className="ToastDescription">{message}</Toast.Description>
          </Toast.Root>
          <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>,
        portalRoot
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
