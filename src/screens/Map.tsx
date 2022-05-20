import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, MarkerAnimated } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';

import AnimatedScrollview from '~/components/AnimatedScrollview';
import { Card } from '~/components/Card';

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

const state = {
  markers: [
    {
      coordinate: {
        latitude: -23.20618,
        longitude: -47.29654
      },
      title: 'Best Place',
      description: 'This is the best place in Portland',
      image: Images[0]
    },
    {
      coordinate: {
        latitude: -23.20595,
        longitude: -47.29655
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

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const { width, height } = Dimensions.get('window');
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width * 0.8;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 25;

  let mapIndex = 0;
  const animation = new Animated.Value(0);

  useEffect(() => {
    animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current &&
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta
              },
              500
            );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp'
    });

    return { scale };
  });

  // const onMarkerPress = (mapEventData) => {
  //   const markerID = mapEventData._targetInst.return.key;

  //   let x = (markerID * CARD_WIDTH) + (markerID * 20);
  //   if (Platform.OS === 'ios') {
  //     x = x - SPACING_FOR_CARD_INSET;
  //   }

  //   _scrollView.current?.scrollTo({x: x, y: 0, animated: true});
  // }

  const _map = useRef<MapView>(null);
  const _scrollView = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.map}
        region={{
          latitude: -23.20618,
          longitude: -47.29654,
          latitudeDelta: 0,
          longitudeDelta: 0.0021
        }}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          };
          return (
            <Marker key={index} coordinate={marker.coordinate}>
              <Animated.View style={[styles.ring]}>
                <View style={styles.marker} />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      {/* Botão pra abrir o scrollview */}
      {/* <TouchableOpacity
        style={{ position: 'absolute', top: 12, left: 12 }}
        onPress={() => {
          setOpenScrollView(!openScrollview);
        }}
      >
        <Text>{openScrollview ? 'Close' : 'Open'}</Text>
      </TouchableOpacity>
      {openScrollview && <AnimatedScrollview />} */}

      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment='center'
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
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
      >
        <View style={styles.cardWrapper}>
          {state.markers.map((marker, index) => {
            return (
              <View style={styles.cardWrapperIn} key={index}>
                <Card
                  title={marker.title}
                  description={marker.description}
                  latitude={marker.coordinate.latitude}
                  image={marker.image}
                />
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardTitle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDescription: {
    fontSize: 12
  },

  scrollView: {
    width: '100%',
    height: 225,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  cardWrapper: {
    flex: 1,

    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',

    padding: 4,
    marginRight: 16,
    paddingHorizontal: 24
  },
  cardWrapperIn: {
    backgroundColor: '#FFF',
    width: 320,
    borderRadius: 5,
    marginHorizontal: 14
  },

  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(130,4,150, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Map;
