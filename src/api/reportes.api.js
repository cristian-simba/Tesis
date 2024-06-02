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

export const getReporteUsuario = (token, id) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/reportes/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options); 
}


export const cambioEstado = (id, token, data) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/cambio/estado/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
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

export const restringirUsuario = (id, token, data) =>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/restringir/usuario/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}

export const bloquearUsuario = (id, token, data) =>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/bloquear/usuario/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}

export const desrestringirUsuario = (id, token, data) =>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/desrestringir/usuario/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}

export const desbloquearUsuario = (id, token, data) =>{
  const url = `${import.meta.env.VITE_BACKEND_URL}/desbloquear/usuario/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}