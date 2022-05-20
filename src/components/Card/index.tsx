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
}

export const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

export function Card({ title, description, latitude, image }: CardProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={{ width: '100%', height: '50%' }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.description}>{latitude}</Text>
    </View>
  );
}
