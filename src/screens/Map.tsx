import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Compass, X } from 'phosphor-react-native';
import MapView, { Marker } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import useLocation from '~/hooks/useLocation';
import useRequest from '~/hooks/useRequest';

import Card from '~/components/Card';
import theme from '~/global/theme';
import ModalView from '~/components/ModalView';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

export type PositionType = {
  title: string;
  description: string;
  image?: string;
};

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const [showCards, setShowCards] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState<IPlace | null>(null);
  const [initialRegion] = useState({
    latitude: -23.20618,
    longitude: -47.29654,
    latitudeDelta: 0,
    longitudeDelta: 0.0041
  });

  const MapRef = useRef<MapView>(null);
  const location = useLocation();
  const { width } = Dimensions.get('window');

  // const CARD_HEIGHT = 220;
  const CARD_WIDTH = width - 7.5;
  // const SPACING_FOR_CARD_INSET = width * 0.1 - 25;

  let mapIndex = 0;
  const animation = new Animated.Value(0);

  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), []);

  useEffect(() => {
    animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      const length = places?.length ?? 0;

      if (index >= length) {
        index = length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index && !!places) {
          mapIndex = index;
          const location = places[index].location;
          MapRef.current &&
            MapRef.current.animateToRegion(
              {
                ...location,
                latitudeDelta: 0,
                longitudeDelta: 0.0021
              },
              500
            );
        }
      }, 10);
    });
  });

  const interpolations = useMemo(
    () =>
      places?.map((marker, index) => {
        const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

        const scale = animation.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: 'clamp'
        });

        return { scale };
      }),
    [places]
  );

  const handleShowModal = useCallback((place: IPlace) => {
    setPlace(place);
    setModalVisible(true);
  }, []);

  const handleHideModal = useCallback(() => {
    setModalVisible(false);
    setPlace(null);
  }, []);

  // const onMarkerPress = (mapEventData) => {
  //   const markerID = mapEventData._targetInst.return.key;

  //   let x = (markerID * CARD_WIDTH) + (markerID * 20);
  //   if (Platform.OS === 'ios') {
  //     x = x - SPACING_FOR_CARD_INSET;
  //   }

  //   _scrollView.current?.scrollTo({x: x, y: 0, animated: true});
  // }

  useEffect(() => {
    if (!showCards && !!location) {
      MapRef.current?.animateToRegion({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.0051
      });
    }
  }, [showCards, location]);

  return (
    <View style={styles.container}>
      <MapView
        showsCompass={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        ref={MapRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {places?.map((place, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations?.[index].scale
              }
            ]
          };
          return (
            <Marker key={index} coordinate={place.location}>
              <Animated.View style={[styles.ring]}>
                <View style={[styles.marker]} />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <TouchableOpacity style={styles.btnShowCards} onPress={() => setShowCards(!showCards)}>
        {showCards ? <X size={24} color={theme.colors.text} /> : <Compass size={24} color={theme.colors.text} />}
      </TouchableOpacity>

      {showCards && (
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          snapToAlignment='center'
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
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              position: 'relative',
              backgroundColor: 'transparent',
              marginBottom: 5
            }}
          >
            {places?.map((place, index) => {
              return (
                <Card
                  key={index}
                  title={place.name}
                  description={'tteste'}
                  place={place}
                  first={index == 0 ? true : false}
                  handleShowModal={handleShowModal}
                />
              );
            })}
          </View>
        </Animated.ScrollView>
      )}
      <ModalView place={place} isVisible={modalVisible} handleHideModal={handleHideModal} />
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

  btnShowCards: {
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: theme.colors.navy_blue
  },

  scrollView: {
    width: '100%',
    height: 225,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  cardWrapper: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    marginBottom: 5,
    transform: [{ translateY: 250 }]
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
