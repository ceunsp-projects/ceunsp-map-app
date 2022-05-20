import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import theme from '~/global/theme';

export function LoginPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
        <Text style={styles.headerText}>CEUNSP LOCALIZA !</Text>
        <Feather name='map-pin' size={36} color={theme.colors.red} />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText} placeholder='E-mail' />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder='Password'
          placeholderTextColor={theme.colors.text_light}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Teste</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.navy_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    borderRadius: 5
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 24,
    color: theme.colors.text
  },

  inputView: {
    width: '80%',
    height: 55,

    borderRadius: 25,
    backgroundColor: '#FFF',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },

  inputText: {
    fontSize: 14
  },

  button: {
    height: 55,
    width: '80%',

    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.red,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30
  },

  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  }
});
