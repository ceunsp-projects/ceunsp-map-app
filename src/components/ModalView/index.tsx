import React, { memo } from 'react';
import { View, Image, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import useRequest from '~/hooks/useRequest';
import { IPlace, IPlaceDetails } from '~/interfaces/map';
import apiService from '~/services/api';
import placeService from '~/services/place';
import PhotoGrid from '../PhotoGrid';

import { styles } from './styles';

interface ModalViewProps {
  isVisible: boolean;
  place: IPlace | null;
  handleHideModal: () => void;
}

const ModalView = memo<ModalViewProps>(({ isVisible, handleHideModal, place }) => {
  if (!place?._id) return null;

  const { response: placeDetails } = useRequest<IPlaceDetails>(() => placeService.details(place?._id), []);

  return (
    <Modal
      style={{ alignItems: 'center' }}
      isVisible={isVisible}
      swipeDirection='down'
      onBackdropPress={handleHideModal}
      onSwipeComplete={handleHideModal}
      animationInTiming={700}
      animationOutTiming={700}
    >
      <View style={styles.cardModal}>
        <PhotoGrid place={place} />
        {/* {place && <Image style={styles.img} source={{ uri: place.image }} />} */}

        <ScrollView style={styles.scrollView} scrollEventThrottle={400}>
          <TouchableOpacity style={styles.touchableOpacity}>
            {placeDetails?.items.map(item => (
              // <View key={item} style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>{item}</Text>
              // </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
});

export default ModalView;
