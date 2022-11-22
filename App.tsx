import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Platform, View } from 'react-native';
import React from 'react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} animated translucent />
      </View>
    );
  }
}
