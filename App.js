/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, Keyboard, TextInput, Button, Text, View } from 'react-native';

import { NativeModules } from 'react-native';
//import PDFView from './src/PDFView';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
const { ToastModule } = NativeModules;

const App: () => React$Node = () => {
  async function _showToast() {
    const { response } = await ToastModule.signPDF(email, password);
    console.log('Respuesta ' + response);
    //ToastModule.showToast(response);
  }

  async function signCades() {
    const response = await ToastModule.signCades(email, password);
    console.log('SignCade -> ' + response);
  }

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [isLtv, setIsLtv] = useState(false);
  const [isStamp, setIsStamp] = useState(false);
  const [isFirmaVisible, setIsFirmaVisible] = useState(false);
  const toggleSwitchLtv = () => setIsLtv(previousState => !previousState);
  const toggleSwitchStamp = () => setIsStamp(previousState => !previousState);
  const toggleSwitchFirmaVisible = () => setIsFirmaVisible(previousState => !previousState);

  const [razon, onChangeRazon] = useState('');
  const [ubicacion, onChangeUbicacion] = useState('');


  const [pdfToSign, setPdfToSign] = useState('');
  const [imageToStamp, setImageToSign] = useState('');


  const handleChoosePdfToSign = () => {
    const options = {
      noData: true,
    }
    DocumentPicker.pick(options, response => {
      if (response.uri) {
        setPdfToSign(response);
        console.log('PDF ')
        console.log(response)
      }
    })
  }

  const handleChooseImageToStamp = () => {
    const options = {
      noData: true,
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImageToSign(source)
        console.log('imagen ')
        console.log(source)
      }
    });
  }

  const sign = () => {
  }

  const colorEnable = (isEnabled) => {
    return isEnabled ? "blue" : "#f4f3f4"
  }

  const colorSwitch = { false: "#767577", true: "#81b0ff" };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Firma Ya</Text>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleChoosePdfToSign}
            >
              <Text style={styles.saveButtonText}>Seleccionar PDF</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Usuario"
              maxLength={20}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Contraseña"
              maxLength={20}
            />
          </View>

          <View style={styles.containerSwitch}>
            <Text style={styles.label}>LTV</Text>
            <Switch
              trackColor={colorSwitch}
              thumbColor={colorEnable(isLtv)}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchLtv}
              value={isLtv}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Razón"
              maxLength={20}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ubicación"
              maxLength={20}
            />
          </View>

          <View style={styles.containerSwitch}>
            <Text style={styles.label}>Firma Visible</Text>
            <Switch
              trackColor={colorSwitch}
              thumbColor={colorEnable(isFirmaVisible)}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchFirmaVisible}
              value={isFirmaVisible}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleChooseImageToStamp}
            >
              <Text style={styles.saveButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerSwitch}>
            <Text style={styles.label}>Estampa</Text>
            <Switch
              trackColor={colorSwitch}
              thumbColor={colorEnable(isStamp)}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchStamp}
              value={isStamp}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Usuario"
              maxLength={20}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Clave"
              maxLength={20}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={sign}
            >
              <Text style={styles.saveButtonText}>Firmar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 10
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 60,
    height: 45,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  label: {
    color: '#007BFF',
    fontSize: 15,
    width: '40%',
    textAlign: 'left',
    paddingLeft: 25,
    textAlignVertical: 'center',
    marginRight: 100
  },
  containerSwitch: {
    flexDirection: 'row',
    marginTop: 10
  }

});

export default App;
