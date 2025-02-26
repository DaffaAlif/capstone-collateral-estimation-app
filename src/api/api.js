import axios from "axios";
import store from "../store";


const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDrafts = async (currentPage) => {
  try {

    const response = await api.get(`/api/v1/history?is_completed=false&offset=${(currentPage - 1) * 5}&limit=5`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchHistories = async (currentPage) => {
  try {
    const response = await api.get(`/api/v1/history?is_completed=true&offset=${(currentPage - 1) * 5}&limit=5`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteHistory = async (id) => {
  try {
    const response = await api.delete(`/api/v1/history/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postLogin = async (credentials) => {
 try {
  const response = await api.post('/api/v1/auth/login', credentials)
  return response;
 } catch (error) {
  console.error(error);
  throw error;
 }
}

export const estimate = async (data) => {
  try {
    const response = await api.post('/api/v1/predict', data)
    return response;
   } catch (error) {
    console.error(error);
    throw error;
   }
}

export const fetchToken = async () =>{
  try {
    const response = await api.get('/api/v1/auth/me')
    return response;
   } catch (error) {
    console.error(error);
    throw error;
   }
}

export default api;