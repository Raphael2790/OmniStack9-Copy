import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png';


export default function Login( { navigation }) {
  const [ techs, setTechs] = useState('');
  const [ email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        navigation.navigate('List');
      }
    })
  }, [])
 
  async function handleSubmit() { 
    const response = await api.post('/sessions', {
      email
    });

    const {_id} = response.data

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs)
    
    navigation.navigate('List')
  }

  return (
    <View style={styles.container}>
      <Image source={logo}/>
      <View style={styles.form}>
        <Text style={styles.label}>
          SEU E-MAIL *
        </Text>
        <TextInput 
          placeholder="Seu melhor e-mail"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <KeyboardAvoidingView 
        behavior='padding'
        style={styles.form}
        enabled={Platform.OS === 'ios'}>
        <Text style={styles.label}>
          TECNOLOGIAS *
        </Text>
        <TextInput 
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={text => setTechs(text)}
          value={techs}
        />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
         Encontrar Spots
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  form:{
    alignSelf:'stretch',
    paddingHorizontal:30,
    marginTop:30,
  },
  label:{
    fontWeight:'bold',
    color:'#444',
    marginBottom:8,
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
})
