import axios from 'axios'

export const getUsers = (token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/listar/usuarios`
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(url, options)
}