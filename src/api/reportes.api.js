import axios from 'axios'

export const getNotificaciones = (token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/notificaciones`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options);
}

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
export const falsoReporte = (id, token, data) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/falso/usuario/${id}`;
  data = {}
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, data, options);
}

export const restringirUsuario = (id, token, tiempo) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/restringir/usuario/${id}`;
  const diasText = tiempo === 1 ? 'día' : 'días'; 
  const data = { tiempo: `${tiempo} ${diasText}` }; 
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  console.log("data", data)
  return axios.put(url, data, options);
};

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