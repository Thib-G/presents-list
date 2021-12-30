import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default axios;
