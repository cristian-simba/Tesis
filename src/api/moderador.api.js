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

export const forgotPassword = (data) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/recuperar`;
  return axios.post(url, data);
}

export const comprobarToken = (token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/recuperar/${token}`;
  return axios.get(url);
}

export const recoverPassword = (data, token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/nuevopasword/${token}`;
  return axios.post(url, data);
};

export const updatePassword = (data, id, token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/actualizar/moderador/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}