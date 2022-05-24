import { useContext } from 'react';
import ErrorContext from '~/contexts/error';

export default function useError() {
  const { error, onError } = useContext(ErrorContext);
  return { error, onError };
}
