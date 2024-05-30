import axios from 'axios'

export const getReportes = (token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/reportes`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options);
}

export const getReporte = (token, id) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/reporte/unico/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options); 
}

export const deletePublicacion = (id, token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/publicacion/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(url, options);
}