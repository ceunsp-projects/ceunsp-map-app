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
  async get<T = any>(url: string, params?: any): Promise<T> {
    return this.client().get(url, { params });
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    return this.client().post(url, data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      }
    });
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    return this.client().put(url, data);
  }

  async delete<T = any>(url: string, params?: any): Promise<T> {
    return this.client().delete(url, { params });
  }

  private client(): AxiosInstance {
    return axios.create({
      baseURL: BASE_ENDPOINT
    });
  }
}
const apiService = new ApiService();
export default apiService;
