import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { PositionType } from '~/screens/Map';

import { styles } from './styles';

interface ModalViewProps {
  isVisible: boolean;
  infoModal: PositionType | null;
  handleHideModal: () => void;
}

export function ModalView({ isVisible, handleHideModal, infoModal }: ModalViewProps) {
  return (
    <View>
      <Modal
        style={{ alignItems: 'center' }}
        isVisible={isVisible}
        swipeDirection='down'
        onBackdropPress={handleHideModal}
        onSwipeComplete={handleHideModal}
      >
        <View
          style={{
            backgroundColor: 'red',
            width: 240,
            height: 240
          }}
        ></View>
      </Modal>
    </View>
  );
}
