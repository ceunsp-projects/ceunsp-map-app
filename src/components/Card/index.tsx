import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';

type ImageProps = {
  uri: string;
};

interface CardProps {
  title: string;
  description: string;
  latitude: number;
  image: ImageProps;
  first: boolean;
}

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

export function Card({ title, description, latitude, image, first }: CardProps) {
  return (
    <View style={first ? styles.firstContainer : styles.container}>
      <Image source={image} style={styles.img} />
      <View style={styles.cardDescription}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.description}>{latitude}</Text>
      </View>
    </View>
  );
}
