import React from 'react';
import { View, Image, ScrollView, Text, SafeAreaView } from 'react-native';
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
        <View style={styles.cardModal}>
          {infoModal && <Image style={styles.img} source={{ uri: infoModal.image }} />}

          <ScrollView style={styles.scrollView} scrollEventThrottle={400}>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
            <View style={styles.imgItens}>
              <Text style={styles.imgItensTxt}>Objeto identificado na imagem</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
