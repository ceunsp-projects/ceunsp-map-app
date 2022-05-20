import React, { memo } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import AnimatedScrollview from '~/components/AnimatedScrollview';

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: -23.20618,
          longitude: -47.29654,
          latitudeDelta: 0,
          longitudeDelta: 0.0021
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.20618,
            longitude: -47.29654,
            latitudeDelta: 0,
            longitudeDelta: 0.0021
          }}
        >
          <Callout>
            <Text>Você está aqui</Text>
          </Callout>
        </Marker>
      </MapView>
      <AnimatedScrollview />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  map: {
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  marker: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },

  cardTitle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDescription: {
    fontSize: 12
  }
});

export default Map;
