import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import useLocation from '~/hooks/useLocation';
import useRequest from '~/hooks/useRequest';

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {

  const MapRef = useRef<MapView>(null);
  // const [destination, setDestination] = useState<any[]>([]);
  const [initialRegion] = useState({
    latitude: -23.20618,
    longitude: -47.29654,
    latitudeDelta: 0,
    longitudeDelta: 0.0041,
  });

  const location = useLocation();

  useEffect(() => {
    MapRef.current?.animateToRegion({
      latitude: initialRegion?.latitude,
      longitude: initialRegion?.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.0051,
    });
  }, []);

  const { response: places } = useRequest<{ name: string, location: { latitude: number, longitude: number } }[]>('/places', 'GET');

  return (
    <View style={styles.container}>
      <MapView
        ref={MapRef}
        style={styles.map}
        initialRegion={initialRegion}>
        <Marker
          coordinate={initialRegion}>
          <Callout>
            <Text>Aqui é a CEUNSP</Text>
          </Callout>
        </Marker>


        {!!location?.coords?.latitude && (
          <Marker
            pinColor='black'
            coordinate={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude
            }}
          >
            <Callout>
              <Text>Você está aqui</Text>
            </Callout>
          </Marker>
        )}

        {places?.map(place => (
          <Marker
            key={place.name}
            pinColor='black'
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude
            }}>
            <Callout>
              <Text>{place.name}</Text>
            </Callout>
          </Marker>
        ))}

        {/* {!!location?.coords?.latitude && (
          <MapViewDirections apikey='AIzaSyB3oypWdPdf3nkiSxDfkBos7oDmdQoXAvE' origin={
            {
              latitude: -23.20618,
              longitude: -47.29654,
            }

          } destination={
            {
              latitude: location?.coords?.latitude ?? 0,
              longitude: location?.coords?.longitude ?? 0,
            }
          } />
        )} */}
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
