import { StyleSheet, Dimensions } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.red,
    width: Dimensions.get('window').width - 15,
    borderRadius: 5,
    marginRight: 7.5
  },
  firstContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.red,
    width: Dimensions.get('window').width - 15,
    borderRadius: 5,
    marginHorizontal: 7.5
  },
  img: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  cardDescription: {
    width: '100%',
    padding: 7
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    alignSelf: 'center',
    color: theme.colors.text,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: theme.colors.text
  },
  icon: {
    color: 'black'
  },
  footer: {}
});
