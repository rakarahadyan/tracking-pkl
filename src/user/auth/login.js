import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, ImageBackground, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    if (!email) {
      Alert.alert('Error', 'email harus diisi.');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Password harus diisi.');
      return;
    }

    if (email === 'example@gmail.com' && password === '1234') {

        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        navigation.replace('Main');

    }

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../../assets/LOGOPKL.png')} style={styles.image} resizeMode='contain' />
        <Text style={styles.title}>Login dulu nanti keburu laper</Text>
        <View style={styles.inputView}>
          <Text style={{ fontWeight: 'bold' }}> Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Masukan Email Anda'    
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Text style={{ fontWeight: 'bold' }}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder='Masukan Password Anda'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={'#000'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#61B9D0', '#0774B8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
            />
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ImageBackground
        source={require('./component/sea_bg.jpg')}
        style={[styles.backgroundImage]}
      >
        <Text style={[styles.footerText, { marginTop: Platform.OS === 'ios' ? 200 : 160 } ]}>Copyright 2024. By PT Digital Mahakarya Abadi</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 150,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image : {
    height : 100,
    width : 250
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 40,
    paddingVertical: 30,
    color: 'black',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: '#DAF1F8',
  },
  inputPassword: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#DAF1F8',
    padding: 10,
    marginBottom: 10,
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'white',
    height: 45,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
  },
});
