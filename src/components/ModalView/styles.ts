import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',

    width: width,
    height: height,

    alignItems: 'center',
    justifyContent: 'center'
  },
  cardModal: {
    backgroundColor: 'red',
    position: 'absolute',
    left: width / 2,
    top: height / 2,

    width: 60,
    height: 60
  }
});
