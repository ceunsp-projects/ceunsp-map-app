import { StyleSheet, Dimensions } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    height: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.text
  }
});
