import axios from 'axios';
import useError from '~/hooks/useError';
import { BASE_ENDPOINT } from '~/settings';

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
  baseURL: BASE_ENDPOINT
})

export default apiService;
