import React, { memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { IPlace } from '~/interfaces/map';

import { styles } from './styles';

type ImageProps = {
  uri: string;
};

interface CardProps {
  title: string;
  description: string;
  image?: ImageProps;
  first: boolean;
  place: IPlace;
  handleShowModal: (place: IPlace) => void;
}

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

const Card = memo<CardProps>(({ title, description, image, first, place, handleShowModal }) => {
  const onShowModal = useCallback(() => handleShowModal(place), []);

  return (
    <TouchableOpacity
      style={first ? styles.firstContainer : styles.container}
      onPress={onShowModal}
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
