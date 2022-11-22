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
    flex: 1,
    backgroundColor: theme.colors.navy_blue,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  touchableOpacity: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7
  },
  imgItens: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: theme.colors.navy_blue
  },
  imgItensTxt: {
    flex: 1,
    textAlign: 'center',
    margin: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.text,
    color: theme.colors.navy_blue,
    fontSize: 14,
    fontWeight: 'bold'
  }
});
