/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, Button, Text} from 'react-native';

import {NativeModules} from 'react-native';
const {ToastModule} = NativeModules;

const App: () => React$Node = () => {
  async function _showToast() {
    const {response} = await ToastModule.signPDF(email, password);
    console.log('Respuesta ' + response);
    ToastModule.showToast(response);
  }

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
        />

        <Button onPress={_showToast} title="Validar" />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default App;
