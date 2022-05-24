import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

type ImageProps = {
  uri: string;
};

interface CardProps {
  title: string;
  description: string;
  image: ImageProps;
  handleShowModal: (image: string, title: string, description: string) => void;
}

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

export function Card({ title, description, image, handleShowModal }: CardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleShowModal(image.uri, title, description);
      }}
    >
      <Image source={image} style={{ width: '100%', height: '50%' }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}
