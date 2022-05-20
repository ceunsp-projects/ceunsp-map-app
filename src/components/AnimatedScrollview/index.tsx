import React, { useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { styles } from './styles';
import theme from '~/global/theme';
import { Card } from '../Card';

function AnimatedScrollview() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  const animation = new Animated.Value(0);

  const { width, height } = Dimensions.get('window');
  const CARD_WIDTH = width * 0.8;

  const CARD_HEIGHT = height / 4;

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
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 90, right: 25, display: 'none' }}
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <BottomSheet ref={bottomSheetRef} snapPoints={[1, 280]}>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
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
            {state.markers.map((marker, index) => {
              return (
                <View style={styles.cardWrapperIn} key={index}>
                  <Card title={marker.title} description={marker.description} latitude={marker.coordinate.latitude} />
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </BottomSheet>
    </View>
  );
}

export default AnimatedScrollview;
