import { StyleSheet, Dimensions } from 'react-native';
import theme from '~/global/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.navy_blue,
    width: Dimensions.get('window').width - 15,
    borderRadius: 5,
    marginRight: 7.5,
  },
  firstContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.navy_blue,
    width: Dimensions.get('window').width - 15,
    borderRadius: 5,
    marginHorizontal: 7.5
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  cardDescription: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: theme.colors.text,
    fontWeight: 'bold',
    backgroundColor: theme.colors.navy_blue_light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    alignSelf: 'center'
  },
  icon: {
    color: 'black'
  },
  footer: {}
});
