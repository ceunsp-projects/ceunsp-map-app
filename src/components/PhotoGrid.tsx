import { useNavigation } from '@react-navigation/native';
import { memo, useCallback } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { IPlace } from '~/interfaces/map';

interface IPhotoGrid {
  place: IPlace;
  handleHideModal: () => void;
}

const PhotoGrid = memo<IPhotoGrid>(({ place, handleHideModal }) => {
  const navigation = useNavigation();

  const onViewAll = useCallback(() => {
    handleHideModal()
    setTimeout(() => navigation.navigate('Galery', { place }), 0)
  }, [place]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {place.pictures.map(
          (picture, index) =>
            index <= 4 && (
              <Image
                key={index}
                style={place.pictures.length === 1 ? styles.onlyOne : styles.image}
                source={{ uri: picture }}
                resizeMode='cover'
              />
            )
        )}
      </View>

      <TouchableOpacity onPress={onViewAll} style={styles.button}>
        <Text style={styles.buttonText}>Ver todas</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  content: { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 },
  image: { width: '45%', height: 100, margin: 4, borderRadius: 10, borderWidth: 1, borderColor: '#fff' },
  onlyOne: { width: '91%', height: 204, margin: 4, borderRadius: 10, borderWidth: 1, borderColor: '#fff' },
  button: { padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#fff', borderRadius: 10 },
  buttonText: { color: '#fff' }
});

export default PhotoGrid;
