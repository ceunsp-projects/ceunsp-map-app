import { StatusBar } from 'expo-status-bar';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Platform, StyleSheet, View } from 'react-native';
import { Fragment, memo } from 'react';

const App: React.FC = memo(() => {
  const colorScheme = useColorScheme();
  return (
    <Fragment>
      <View style={styles.container}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} animated translucent />
        <Navigation colorScheme={colorScheme} />
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;

