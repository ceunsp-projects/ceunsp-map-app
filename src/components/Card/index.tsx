import React, { memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { IPlace } from '~/interfaces/map';

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

const Card = memo<CardProps>(({ key, title, description, image, first, place, handleShowModal, onLayout }) => {
  const onShowModal = useCallback(() => handleShowModal(place), []);

  return (
    <TouchableOpacity
      style={first ? styles.firstContainer : styles.container}
      onPress={onShowModal}
      onLayout={onLayout}
    >
      {!!image && <Image source={image} style={styles.img} />}
      <View style={styles.cardDescription}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
})

export default Card;
