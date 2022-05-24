import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

type ImageProps = {
  uri: string;
};

interface CardProps {
  title: string;
  description: string;
  image?: ImageProps;
  first: boolean;
  handleShowModal: (title: string, description: string, image?: string) => void;
}

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

export function Card({ title, description, image, first, handleShowModal }: CardProps) {
  return (
    <TouchableOpacity
      style={first ? styles.firstContainer : styles.container}
      onPress={() => {
        handleShowModal(title, description, image?.uri);
      }}
    >
      {!!image && <Image source={image} style={styles.img} />}
      <View style={styles.cardDescription}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
