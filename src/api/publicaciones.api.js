import axios from "axios";

const publicacionesApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/publicaciones/`
})

export const getPublicaciones = () => publicacionesApi.get("/")