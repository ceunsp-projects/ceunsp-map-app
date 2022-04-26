import React, { memo } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: -23.20618,
          longitude: -47.29654,
          latitudeDelta: 0,
          longitudeDelta: 0.0021,
        }}>
        <Marker
          coordinate={{
            latitude: -23.20618,
            longitude: -47.29654,
            latitudeDelta: 0,
            longitudeDelta: 0.0021,
          }}>
          <Callout>
            <Text>Você está aqui</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
