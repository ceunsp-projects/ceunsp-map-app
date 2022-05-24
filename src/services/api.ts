import axios from 'axios';
import useError from '~/hooks/useError';

axios.interceptors.response.use(
  res => res,
  error => {
    const { onError } = useError();
    onError(error);
  }
);

axios.interceptors.request.use(
  res => res,
  error => {
    const { onError } = useError();
    onError(error);
  }
);

const apiService = axios.create({
  baseURL: 'http://192.168.0.17:3333'
})

export default apiService;
