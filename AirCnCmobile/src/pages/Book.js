import React, { useState} from 'react';
import { Text,SafeAreaView , StyleSheet, Platform, StatusBar, AsyncStorage, TextInput, TouchableOpacity, Alert} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const id = navigation.getParam('id');
  const [date , setDate] = useState('');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {date},{
      headers:{ user_id}
    })
    
    Alert.alert("Solicitação de reserva enviada");

    navigation.navigate('List')

  }

  function handleCancel() {
    navigation.navigate('List')
  }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.label}>
          DATA DE INTERESSE *
        </Text>
        <TextInput 
          placeholder="Qual data você quer reservar?"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setDate}
          value={date}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
          Solicitar reserva
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>
          Cancelar
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:30,
    paddingTop:Platform.OS === 'android'? StatusBar.currentHeight:0,
  },
  label:{
    fontWeight:'bold',
    color:'#444',
    marginBottom:8,
    marginTop:30,
  },
  input:{
    borderWidth:1,
    color:'#444',
    fontSize: 16,
    height:44,
    borderColor:'#ddd',
    marginBottom:20,
    paddingHorizontal:20,
    borderRadius:2,
  },
  button:{
    height:42,
    backgroundColor:'#f05a5b',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:2,
  },
  buttonText:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold',
  },
  cancelButton:{
    height:42,
    backgroundColor:'#ccc',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:2,
    marginTop: 10,
  },
})
