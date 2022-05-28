import React, { memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, LayoutChangeEvent, ImageBackground } from 'react-native';
import { IPlace } from '~/interfaces/map';
import { Shadow } from 'react-native-shadow-2';

import { styles } from './styles';

type ImageProps = {
  uri: string;
};

interface CardProps {
  key: number;
  title: string;
  description: string;
  image?: ImageProps;
  first: boolean;
  place: IPlace;
  handleShowModal: (place: IPlace) => void;
  onLayout: (event: LayoutChangeEvent) => void;
}

const Card = memo<CardProps>(({ title, description, image, first, place, handleShowModal, onLayout }) => {
  const onShowModal = useCallback(() => handleShowModal(place), []);

  return (
    <TouchableOpacity style={first ? styles.firstContainer : styles.container} onPress={onShowModal} onLayout={onLayout}>
      <ImageBackground
        style={styles.img}
        imageStyle={{ borderRadius: 5 }}
        source={{ uri: place.pictures[place.pictures.length - 1] }}
        resizeMode='cover'
      >
        <View style={styles.cardDescription}>
          <Shadow distance={100} startColor={'rgba(255,255,255,0.15)'} finalColor={'rgba(255,255,255,0.01)'} offset={[0, -5]}>
            <Text style={styles.title}>{title}</Text>
          </Shadow>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

export default Card;
