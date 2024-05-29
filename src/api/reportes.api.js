import axios from 'axios'

export const getReportes = (token, id) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/notificaciones/moderador/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options);
}
