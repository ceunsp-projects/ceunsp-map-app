import React, { memo } from 'react';
import { Animated, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Card } from '~/components/Card';

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  const animation = new Animated.Value(0);

  const { width, height } = Dimensions.get('window');

  const CARD_HEIGHT = height / 4;
  const CARD_WIDTH = CARD_HEIGHT - 50;

  const state = {
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817
        },
        title: 'Best Place',
        description: 'This is the best place in Portland',
        image: Images[0]
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507
        },
        title: 'Second Best Place',
        description: 'This is the second best place in Portland',
        image: Images[1]
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034
        },
        title: 'Third Best Place',
        description: 'This is the third best place in Portland',
        image: Images[2]
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917
        },
        title: 'Fourth Best Place',
        description: 'This is the fourth best place in Portland',
        image: Images[3]
      }
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    }
  };

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

      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
      >
        <View style={styles.cardWrapper}>
          <Text>
            {state.markers.map((marker, index) => {
              return (
                <View>
                  <Card
                    key={index}
                    title={marker.title}
                    description={marker.description}
                    latitude={marker.coordinate.latitude}
                  />
                </View>
              );
            })}
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  marker: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  scrollView: {
    width: '100%',
    height: 225,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0
  },
  cardTitle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDescription: {
    fontSize: 12
  },
  cardWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginRight: 16,
    paddingHorizontal: 24
  }
});

export default Map;
