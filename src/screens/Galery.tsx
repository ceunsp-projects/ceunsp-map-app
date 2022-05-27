import { useIsFocused, useRoute } from '@react-navigation/native';
import { memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, TextInput, StyleSheet } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { Text, View } from '~/components/Themed';
import theme from '~/global/theme';
import useRequest from '~/hooks/useRequest';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

const Galery = memo(() => {
  const isFocused = useIsFocused();
  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

  const [allPlaces, setAllPlaces] = useState<IPlace[] | undefined>(places);
  const [searchValue, setSearchValue] = useState('');
  const [currentPlace, setCurrentPlace] = useState<IPlace>();
  const route = useRoute();
  const placeToViewAll = route.params?.place;

  const searchPlace = useCallback(() => {
    if (searchValue != '') {
      const filter = allPlaces?.filter(value => value.name.toLowerCase().includes(searchValue.toLowerCase()));
      setAllPlaces(filter);
    } else {
      setAllPlaces(places);
    }
  }, [searchValue]);

  useEffect(() => {
    searchPlace();
  }, [searchValue]);

  useEffect(() => {
    if (!!placeToViewAll) {
      setCurrentPlace(placeToViewAll);
    }
  }, [placeToViewAll]);

  if (!!currentPlace?.pictures)
    return (
      <ScrollView style={{ backgroundColor: theme.colors.navy_blue }}>
        <Text>{currentPlace.name}</Text>
        <GridImageView data={currentPlace.pictures} />
      </ScrollView>
    );

  return (
    <ScrollView style={{ backgroundColor: theme.colors.navy_blue }}>
      <View style={styles.searchContent}>
        <TextInput style={styles.inputSearch} placeholder='Pesquisar...' onChangeText={setSearchValue} />
      </View>
      {allPlaces && allPlaces?.length > 0 ? (
        allPlaces?.map(place => (
          <View key={place._id} style={{ backgroundColor: theme.colors.navy_blue }}>
            <Text>{place.name}</Text>
            <GridImageView data={place.pictures} />
          </View>
        ))
      ) : (
        <View style={styles.notFound}>
          <Text style={styles.textNotFound}>Sem registros para sua busca...</Text>
        </View>
      )}
    </ScrollView>
  );
});

export default Galery;

export const styles = StyleSheet.create({
  searchContent: {
    width: '100%',
    backgroundColor: theme.colors.navy_blue,
    alignItems: 'center',
    paddingVertical: 10
  },
  inputSearch: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 20,
    paddingLeft: 10
  },
  notFound: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textNotFound: {
    color: theme.colors.text,
    fontSize: 18
  }
});
