import React, { memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, LayoutChangeEvent, ImageBackground } from 'react-native';
import { IPlace } from '~/interfaces/map';
// import { Shadow } from 'react-native-shadow-2';

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
    <TouchableOpacity
      style={styles.container}
      onPress={onShowModal}
      onLayout={onLayout}
      activeOpacity={0.8}
    >
      <ImageBackground
        style={styles.img}
        imageStyle={{ borderRadius: 5 }}
        source={{ uri: place?.pictures?.[0] }}
        resizeMode='cover'
      >
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

export default Card;
