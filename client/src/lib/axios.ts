import axios from 'axios';

const URL = 'http://localhost:5000' || process.env.URL;

const api = axios.create({
  baseURL: URL + '/api/v1',
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

// api.defaults.headers.common["authorization"] = "AUTH_TOKEN"

export default api;
