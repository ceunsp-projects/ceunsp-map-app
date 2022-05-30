import * as Location from 'expo-location';
import usePromise from './usePromise';
import useError from './useError';

export default function useLocation() {
  const { onError } = useError();

  const { response: permissions } = usePromise(() => Location.requestForegroundPermissionsAsync(), []);

  if ((!permissions?.granted || permissions.status !== 'granted') && permissions !== undefined) onError('Estamos sem permissão para acessar sua localização');

  const { response: location } = usePromise(() => Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest }), []);

  return location;
}
