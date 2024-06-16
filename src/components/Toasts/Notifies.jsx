import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotifyError(text) {
  toast.error(text);
}

export function NotifySuccess(text) {
  toast.success(text);
}

const TestToast = () => {
  return (
    <div>
      <button onClick={() => NotifySuccess("Test Success")}>Success</button>
      <button onClick={() => NotifyError("Test Error")}>Error</button>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default TestToast;
