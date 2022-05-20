import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  scrollView: {
    width: '100%',
    height: 225,
    position: 'absolute',
    bottom: 100,
    left: 0
  },
  cardWrapper: {
    flex: 1,

    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',

    padding: 4,
    marginRight: 16,
    paddingHorizontal: 24
  },
  cardWrapperIn: {
    backgroundColor: '#FFF',
    width: 320,
    borderRadius: 5,
    marginHorizontal: 14
  }
});
