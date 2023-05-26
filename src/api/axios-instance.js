import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'http://fb7960l1.beget.tech/api/'

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error?.config;

//     if (error?.response?.status === 401) {
//       localStorage.removeItem('token')
//       window.location.pathname = '/login'
//     }

//     return config;
//   }
// );