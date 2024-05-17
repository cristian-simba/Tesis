import axios from "axios";

export const registerModerador = (data, id, token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/registrar/moderador/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post(url, data, options);
}

export const resetPassword = (data) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/recuperar`;
  return axios.post(url, data);
}