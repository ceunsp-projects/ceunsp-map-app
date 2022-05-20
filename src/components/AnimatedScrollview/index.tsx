import React, { forwardRef, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import {} from '../../screens/Map';
import { styles } from './styles';

import { Card, Images } from '../Card';

// interface AnimatedScrollviewProps {
//   map: React.LegacyRef<MapView> | undefined
// }

function AnimatedScrollview() {
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
        }
      }, 10);
    });
  });

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
}

export default AnimatedScrollview;
