import { StyleSheet, Dimensions } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.navy_blue,
    width: Dimensions.get('window').width - 15,
    height: '100%',
    borderRadius: 5,
    marginRight: 7.5,
    position: 'relative'
  },
  firstContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.navy_blue,
    width: Dimensions.get('window').width - 15,
    height: '100%',
    borderRadius: 5,
    marginHorizontal: 7.5,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%'
  },
  titleView: {
    width: '100%',
    height: 30,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  title: {
    color: theme.colors.text
  }
});
