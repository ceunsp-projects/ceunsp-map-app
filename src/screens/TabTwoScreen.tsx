import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Camera from '~/components/Camera';
import { LoginPage } from './LoginPage';

const TabTwoScreen = memo(() => {
  return (
    <View style={styles.container}>
      <Camera />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TabTwoScreen;
