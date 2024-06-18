import axios from "axios";

const publicacionesApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/publicacionesF/`
})

export const getPublicaciones = () => publicacionesApi.get("/")