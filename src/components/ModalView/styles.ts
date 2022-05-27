import { Dimensions, StyleSheet } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  cardModal: {
    backgroundColor: theme.colors.navy_blue,
    width: '100%',
    height: Dimensions.get('screen').height * 0.8,
    borderRadius: 4
  },
  img: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  scrollView: {
    backgroundColor: theme.colors.navy_blue,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  touchableOpacity: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 7
  },
  imgItens: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: theme.colors.navy_blue
  },
  imgItensTxt: {
    marginRight: 12,
    borderRadius: 6,
    marginBottom: 6,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.text,
    padding: 4,
    color: theme.colors.navy_blue,
    fontWeight: 'bold'
  }
});
