import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function LoginPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CEUNSP LOCALIZA !</Text>
        <Feather name='map-pin' size={36} color='black' />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText} placeholder='E-mail' />
      </View>

      <View style={styles.inputView}>
        <TextInput style={styles.inputText} placeholder='Password' />
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
    backgroundColor: '#003f5c',
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
    fontSize: 36,
    marginBottom: 24
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    fontSize: 14
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#465881',
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
