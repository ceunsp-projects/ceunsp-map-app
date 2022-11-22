import { StatusBar } from 'expo-status-bar';
import React, { Fragment, memo } from 'react';
import { View, Image, ScrollView, Text, SafeAreaView, TouchableOpacity, TouchableNativeFeedbackBase, TouchableWithoutFeedback, Platform } from 'react-native';
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
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} animated backgroundColor='rgba(0,0,0,0.7)' />
      <View style={styles.cardModal}>
        <PhotoGrid place={place} handleHideModal={handleHideModal} />

        {!!placeDetails?.items ? (
          <ScrollView style={styles.scrollView}>
            {placeDetails?.items.map((item, index) => <Text key={item + index} style={styles.imgItensTxt}>{item ?? ''}</Text>)}
          </ScrollView>
        ) : null}
      </View>
    </Modal>
  );
});

export default ModalView;
