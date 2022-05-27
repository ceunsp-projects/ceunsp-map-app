import React, { Fragment, memo } from 'react';
import { View, Image, ScrollView, Text, SafeAreaView, TouchableOpacity, TouchableNativeFeedbackBase, TouchableWithoutFeedback } from 'react-native';
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

        <ScrollView style={styles.scrollView} scrollEventThrottle={400}>
          <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.touchableOpacity}>
            {placeDetails?.items.map(item => (
              <Text key={item} style={styles.imgItensTxt}>{item}</Text>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
});

export default ModalView;
