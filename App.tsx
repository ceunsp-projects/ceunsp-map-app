import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import useError from '~/hooks/useError';
import { Platform } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { onError } = useError();

  ErrorUtils.setGlobalHandler((error, isFatal) => {
    onError(error)
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} animated translucent />
      </SafeAreaProvider>
    );
  }
}
