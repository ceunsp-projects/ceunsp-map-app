import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

interface CardProps {
  title: string;
  description: string;
  latitude: number;
}

export function Card({ title, description, latitude }: CardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.description}>{latitude}</Text>

        <Feather style={styles.icon} name='anchor' />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
}
