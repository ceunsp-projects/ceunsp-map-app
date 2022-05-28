import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SectionList, Text } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { View } from '~/components/Themed';
import theme from '~/global/theme';
import useRequest from '~/hooks/useRequest';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

const Galery = memo(() => {
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState('');

  const route = useRoute();
  const placeToViewAll = route.params?.place;

  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

  const placesFiltered = useMemo(() => {
    if (!!searchValue)
      return places
        ?.filter(value => value.name.toLowerCase().includes(searchValue.toLowerCase()))
        ?.map(place => ({ title: place.name, data: place.pictures })) ?? [];

    return places?.map(place => ({ title: place.name, data: place.pictures })) ?? []
  }, [places, searchValue]);

  const onChangeText = useCallback((value) => setSearchValue(value), []);
  const onClearText = useCallback(() => setSearchValue(''), []);

  const keyExtractor = useCallback((item) => item, []);
  const renderSectionHeader = useCallback(({ section }) => <Text style={styles.title}>{section.title}</Text>, []);
  const renderSectionFooter = useCallback(
    ({ section: { data } }) => <GridImageView data={data} style={{ backgroundColor: 'red' }} />, []);

  const renderFooter = useCallback(() => placesFiltered?.length >= 0 ? null : (
    <View style={styles.notFound}>
      <Text style={styles.textNotFound}>Sem registros para sua busca...</Text>
    </View>
  ), [placesFiltered]);

  useEffect(() => {
    if (!!placeToViewAll) {
      setSearchValue(placeToViewAll.name);
    }
  }, [placeToViewAll]);

  return (
    <SectionList
      style={styles.list}
      sections={placesFiltered}
      renderItem={() => null}
      keyExtractor={keyExtractor}
      renderSectionHeader={renderSectionHeader}
      renderSectionFooter={renderSectionFooter}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={
        <View style={styles.searchContent}>
          <TextInput
            style={styles.inputSearch}
            placeholder='Pesquisar...'
            value={searchValue}
            onChangeText={onChangeText}
          />
          <FontAwesome size={30} name='close' onPress={onClearText} color='#fff' />
        </View>
      }
    />
  );
});

export default Galery;

export const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.navy_blue,
  },
  searchContent: {
    width: '100%',
    backgroundColor: theme.colors.navy_blue,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  },
  title: {
    paddingLeft: 4,
    paddingVertical: 10,
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
