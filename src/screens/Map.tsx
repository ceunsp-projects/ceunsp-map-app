import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { Compass, X } from 'phosphor-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import useLocation from '~/hooks/useLocation';
import useRequest from '~/hooks/useRequest';

import Card from '~/components/Card';
import theme from '~/global/theme';
import ModalView from '~/components/ModalView';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export type PositionType = {
  title: string;
  description: string;
  image?: string;
};

const Map = memo(({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const [showCards, setShowCards] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState<IPlace | null>(null);
  const [dataSourceCords, setDataSourceCords] = useState<{ _id: number; location: number }[]>([]);
  const [initialRegion] = useState({
    latitude: -23.20618,
    longitude: -47.29654,
    latitudeDelta: 0,
    longitudeDelta: 0.0041
  });

  const isFocused = useIsFocused();
  const route = useRoute();
  const newPlace = route.params?.place ?? null;

  const ScroolViewRef = useRef<ScrollView>();
  const MapRef = useRef<MapView>(null);
  const location = useLocation();
  const { width } = Dimensions.get('window');

  const CARD_WIDTH = width - 7.5;

  let mapIndex = 0;
  const animation = new Animated.Value(0);

  const { response: places, isLoading } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

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

      setTimeout(() => {
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

  const interpolations = places?.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp'
    });

    return { scale };
  });

  const handleShowModal = useCallback((place: IPlace) => {
    setPlace(place);
    setModalVisible(true);
  }, []);

  const handleHideModal = useCallback(() => {
    setModalVisible(false);
    setPlace(null);
  }, []);

  const onShowCards = useCallback(() => {
    if (!showCards && !!places) {
      const firstOfPlaces = places?.[0].location;

      MapRef?.current?.animateToRegion(
        {
          latitude: firstOfPlaces?.latitude ?? 0,
          longitude: firstOfPlaces?.longitude ?? 0,
          latitudeDelta: 0,
          longitudeDelta: 0.0021
        },
        500
      );
    }

    setShowCards(!showCards);
  }, [places, showCards]);

  const onLayout = useCallback(
    (placeId: number) => (event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      setDataSourceCords([...dataSourceCords, { _id: placeId, location: layout.x }]);
    },
    [dataSourceCords, newPlace]
  );

  useEffect(() => {
    if (!showCards && !!location) {
      MapRef.current?.animateToRegion({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.0051
      });
    }
  }, [location]);

  useEffect(() => {
    if (!!newPlace && !isLoading) {
      const place = dataSourceCords.find(coord => coord._id === newPlace._id);
      if (!place?.location) return;

      setTimeout(() => {
        ScroolViewRef.current?.scrollTo({
          x: place.location,
          y: 0,
          animated: true
        });
      }, 2000);
    }
  }, [newPlace, isLoading]);

  return (
    <View style={styles.container}>
      <MapView
        mapPadding={{ top: 40, right: 0, bottom: 0, left: 0 }}
        showsCompass={true}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsIndoors={true}
        showsUserLocation={true}
        ref={MapRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {places?.map((place, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations?.[index].scale ?? 1
              }
            ]
          };
          return (
            <Marker key={index} coordinate={place.location}>
              <Animated.View style={styles.markerWrap}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                <View style={[styles.marker]} />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <TouchableOpacity style={styles.btnShowCards} onPress={onShowCards}>
        {showCards ? <X size={24} color={theme.colors.text} /> : <Compass size={24} color={theme.colors.text} />}
        {/* {showCards ? <Text>Fechar</Text> : <Text>Abrir</Text>} */}
      </TouchableOpacity>

      {showCards && (
        <Animated.ScrollView
          ref={ScroolViewRef}
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
          {places?.map((place, index) => {
            return (
              <Card
                onLayout={onLayout(place._id)}
                key={index}
                title={place.name}
                description={'Teste'}
                place={place}
                first={index == 0 ? true : false}
                handleShowModal={handleShowModal}
              />
            );
          })}
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
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(20, 69, 114, 0.9)'
  },
  markerWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    top: 50,
    left: 10,
    backgroundColor: theme.colors.navy_blue
  },

  scrollView: {
    width: '100%',
    height: 170,
    position: 'absolute',
    bottom: 5,
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
    backgroundColor: 'rgba(20, 69, 114, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(20, 69, 114, 0.5)'
  }
});

export default Map;
