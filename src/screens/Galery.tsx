import { useIsFocused, useRoute } from '@react-navigation/native';
import { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { Text, View } from '~/components/Themed';
import useRequest from '~/hooks/useRequest';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

const Galery = memo(() => {
  const [currentPlace, setCurrentPlace] = useState<IPlace>();
  const isFocused = useIsFocused();
  const route = useRoute();
  const placeToViewAll = route.params?.place;

  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

  useEffect(() => {
    if (!!placeToViewAll) {
      setCurrentPlace(placeToViewAll);
    }
  }, [placeToViewAll]);

  if (!!currentPlace?.pictures) return (
    <ScrollView style={{ backgroundColor: 'red' }}>
      <Text>{currentPlace.name}</Text>
      <GridImageView data={currentPlace.pictures} />
    </ScrollView>
  )

  return (
    <ScrollView style={{ backgroundColor: 'red' }}>
      {places?.map(place => (
        <View key={place._id} style={{ backgroundColor: 'red' }}>
          <Text>{place.name}</Text>
          <GridImageView data={place.pictures} style={{ backgroundColor: 'red' }} />
        </View>
      ))}
    </ScrollView>
  )
});

export default Galery;
