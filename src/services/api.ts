import axios, { AxiosInstance } from 'axios';
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

class ApiService {
  async get(url: string, params?: any) {
    return this.client().get(url, { params });
  }

  async post(url: string, data?: any) {
    return this.client().post(url, {
      data,
      headers: {
        'Content-type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    });
  }

  async put(url: string, data?: any) {
    return this.client().put(url, { data });
  }

  async delete(url: string, params?: any) {
    return this.client().delete(url, { params });
  }

  private client(): AxiosInstance {
    return axios.create({
      baseURL: BASE_ENDPOINT
    });
  }
}

// const apiService = axios.create({
//   baseURL: BASE_ENDPOINT
// })

const apiService = new ApiService();
export default apiService;
