import { useIsFocused, useRoute } from '@react-navigation/native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SectionList } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { Text } from '~/components/Themed';
import useRequest from '~/hooks/useRequest';
import { IPlace } from '~/interfaces/map';
import placeService from '~/services/place';

const Galery = memo(() => {
  const [currentPlace, setCurrentPlace] = useState<IPlace | null>();
  const isFocused = useIsFocused();
  const route = useRoute();
  const placeToViewAll = route.params?.place;

  const { response: places } = useRequest<IPlace[]>(() => placeService.list(), [isFocused]);

  const renderSectionFooter = useCallback(
    ({ section: { data } }) => <GridImageView data={data} style={{ backgroundColor: 'red' }} />
    , []);
  const renderSectionHeader = useCallback(({ section }) => <Text>{section.title}</Text>, []);
  const keyExtractor = useCallback((item) => item, []);

  const placesFormated = useMemo(() => {
    if (!!currentPlace?.pictures) return [{ title: currentPlace.name, data: currentPlace.pictures }]

    return places?.map(place => ({ title: place.name, data: place.pictures })) ?? []
  }, [places])

  useEffect(() => {
    if (!!placeToViewAll) {
      setCurrentPlace(placeToViewAll);
    }
  }, [placeToViewAll]);

  useEffect(() => {
    if (!isFocused) setCurrentPlace(null);
  }, [isFocused]);

  return (
    <SectionList
      style={{ backgroundColor: 'red' }}
      sections={placesFormated}
      renderItem={() => null}
      renderSectionHeader={renderSectionHeader}
      renderSectionFooter={renderSectionFooter}
      keyExtractor={keyExtractor}
    />
  )
});

export default Galery;
