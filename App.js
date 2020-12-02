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
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
const { ToastModule } = NativeModules;

const App: () => React$Node = () => {
  async function _showToast() {
    const { response } = await ToastModule.signPDF(email, password);
    console.log('Respuesta ' + response);
    //ToastModule.showToast(response);
  }

  const [email, onChangeEmail] = useState('1194543041105');
  const [password, onChangePassword] = useState('SA45E0FG31');
  const [usuario, onChangeUsuario] = useState('9002042728');
  const [clave, onChangeClave] = useState('GaUZl13SLc/kB88gLYRUwhuRPsd1rNNyy8SY9O8E4URpopw54ZUL68U/2fsq+boYBSJ0TZX9K8wduJN+bXuRYWRlLUXpI5LdCL2/8oyshmc=');

  const [razon, onChangeRazon] = useState('Razon');
  const [ubicacion, onChangeUbicacion] = useState('Bogotà');

  const [isLtv, setIsLtv] = useState(false);
  const [isStamp, setIsStamp] = useState(false);
  const [isFirmaVisible, setIsFirmaVisible] = useState(false);
  const toggleSwitchLtv = () => setIsLtv(previousState => !previousState);
  const toggleSwitchStamp = () => setIsStamp(previousState => !previousState);
  const toggleSwitchFirmaVisible = () => setIsFirmaVisible(previousState => !previousState);



  const [pdfToSign, setPdfToSign] = useState('');
  const [imageToStamp, setImageToStamp] = useState('');


  const handleChoosePdfToSign = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    setPdfToSign(res.uri);
    console.log('PDF ')
    console.log(res)
  }
  const handleChooseImageToStamp = async () => {
    const options = {
      quality: 0.75,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;
        // You can display the image using either:
        source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

        const temp = response.data;

        //Or:
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }
        setImageToStamp(response.uri)
        
        /*console.log('avatar');
        console.log(temp)*/

      }
    });
  }

  const colorEnable = (isEnabled) => {
    return isEnabled ? "blue" : "#f4f3f4"
  }

  const colorSwitch = { false: "#767577", true: "#81b0ff" };

  async function signCades() {
    const response = await ToastModule.signCades(email, password);
    console.log('SignCade -> ' + response);
  }

  async function signPades() {
    console.log('pdf ' + pdfToSign);
    console.log('image ' + imageToStamp);
    const response = await ToastModule.signPades(pdfToSign, email, password,
      isLtv, razon, ubicacion, isStamp,
      isFirmaVisible, imageToStamp, usuario, clave);
    console.log('SignCade -> ' + response);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Firma Ya</Text>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={signCades}
            >
              <Text style={styles.saveButtonText}>Sign Cades</Text>
            </TouchableOpacity>
          </View>
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
              value={email}
              onChange={onChangeEmail}
              style={styles.textInput}
              placeholder="Usuario"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChange={onChangePassword}
              style={styles.textInput}
              placeholder="Contraseña"
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
              value={razon}
              onChange={onChangeRazon}
              style={styles.textInput}
              placeholder="Razón"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={ubicacion}
              onChange={onChangeUbicacion}
              style={styles.textInput}
              placeholder="Ubicación"
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
              value={usuario}
              onChange={onChangeUsuario}
              style={styles.textInput}
              placeholder="Usuario"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={clave}
              onChange={onChangeClave}
              style={styles.textInput}
              placeholder="Clave"
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={signPades}
            >
              <Text style={styles.saveButtonText}>Firmar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
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
