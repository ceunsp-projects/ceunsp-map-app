import { StyleSheet } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  cardModal: {
    backgroundColor: theme.colors.navy_blue,
    width: '100%',
    height: 500,
    borderRadius: 4
  },
  img: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  scrollView: {
    padding: 7,
    backgroundColor: theme.colors.navy_blue,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  imgItens: {
    marginBottom: 10,
    width: '100%',
    height: 30,
    shadowColor: '#f00',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  imgItensTxt: {
    color: theme.colors.text
  }
});
