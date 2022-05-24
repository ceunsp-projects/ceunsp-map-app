import { AxiosError } from 'axios';
import { createContext } from 'react';

interface IError {
  error: AxiosError | null;
  onError: (error: AxiosError) => void;
}

const ErrorContext = createContext<IError>({
  error: null,
  onError: () => { }
});

export default ErrorContext;
