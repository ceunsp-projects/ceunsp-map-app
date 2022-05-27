import { useNavigation } from '@react-navigation/native';
import { memo, useCallback } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { IPlace } from '~/interfaces/map';

interface IPhotoGrid {
  place: IPlace
}

const PhotoGrid = memo<IPhotoGrid>(({ place }) => {
  const navigation = useNavigation();

  const onViewAll = useCallback(() => {
    navigation.navigate('Galery', { place });
  }, [place]);

  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
      {place.pictures.map((picture, index) => index < 4 && (
        <Image key={index} style={{ width: '45%', height: 100, margin: 4, borderRadius: 10, borderWidth: 1, borderColor: '#fff' }} source={{ uri: picture }} resizeMode='cover' />
      ))}

      <TouchableOpacity onPress={onViewAll} style={{ padding: 10 }}>
        <Text style={{ color: '#fff' }}>Ver todas</Text>
      </TouchableOpacity>
    </View>
  );
})

export default PhotoGrid;
