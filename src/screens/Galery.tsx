import { useIsFocused, useRoute } from '@react-navigation/native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SectionList } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { Text, View } from '~/components/Themed';
import theme from '~/global/theme';
import useRequest from '~/hooks/useRequest';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

const Galery = memo(() => {
  const [currentPlace, setCurrentPlace] = useState<IPlace | null>();
  const isFocused = useIsFocused();
  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

  const [allPlaces, setAllPlaces] = useState<IPlace[] | undefined>(places);
  const [searchValue, setSearchValue] = useState('');
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

  const keyExtractor = useCallback((item) => item, []);
  const renderSectionHeader = useCallback(({ section }) => <Text>{section.title}</Text>, []);
  const renderSectionFooter = useCallback(
    ({ section: { data } }) => <GridImageView data={data} style={{ backgroundColor: 'red' }} />
    , []);
  const renderHeader = useCallback(() =>
    <View style={styles.searchContent}>
      <TextInput style={styles.inputSearch} placeholder='Pesquisar...' onChangeText={setSearchValue} />
    </View>
    , []);

  const renderFooter = useCallback(() => allPlaces?.length >= 0 ? null : (
    <View style={styles.notFound}>
      <Text style={styles.textNotFound}>Sem registros para sua busca...</Text>
    </View>
  ), [allPlaces]);

  const placesFormated = useMemo(() => {
    if (!!currentPlace?.pictures) return [{ title: currentPlace.name, data: currentPlace.pictures }]

    return allPlaces?.map(place => ({ title: place.name, data: place.pictures })) ?? []
  }, [allPlaces])

  useEffect(() => {
    if (!!placeToViewAll) {
      setCurrentPlace(placeToViewAll);
    }
  }, [placeToViewAll]);

  useEffect(() => {
    if (!isFocused) setCurrentPlace(null);
  }, [isFocused]);

  useEffect(() => {
    searchPlace();
  }, [searchValue]);

  useEffect(() => setAllPlaces(places), [places]);

  return (
    <SectionList
      style={styles.list}
      sections={placesFormated}
      renderItem={() => null}
      keyExtractor={keyExtractor}
      renderSectionHeader={renderSectionHeader}
      renderSectionFooter={renderSectionFooter}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
    />
  );
});

export default Galery;

export const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.navy_blue,
  },
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
