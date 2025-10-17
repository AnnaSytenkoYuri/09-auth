import axios from "axios";

// axios.defaults.baseURL = "https://notehub-api.goit.study"
// axios.defaults.baseURL = "http://localhost:3000/api"

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

// export const nextServer = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true, // дозволяє axios працювати з cookie
// });