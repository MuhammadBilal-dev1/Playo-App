import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import axios from 'axios';
import { API_URL } from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {token, setToken} = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post(`${API_URL}/users/login`, user).then(response => {
      
      
      const token = response.data.token;
      console.log("token",token)
      AsyncStorage.setItem('token', token);
      setToken(token);
    });
  };
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 130,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 25, fontWeight: '500'}}>
              Login to your account
            </Text>
          </View>

          <View style={{marginTop: 50}}>
            <View>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'gray'}}>
                Email
              </Text>
              <View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 390,
                    marginTop: 15,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontFamily: 'GeezaPro-Bold',
                    fontSize: email ? 18 : 18,
                  }}
                  placeholder="Enter your email"
                />
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'gray',
                  marginTop: 25,
                }}>
                Password
              </Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 390,
                    marginTop: 15,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontFamily: 'GeezaPro-Bold',
                    fontSize: email ? 18 : 18,
                  }}
                  placeholder="Enter your password"
                />
              </View>
            </View>

            <Pressable
              onPress={handleLogin}
              style={{
                width: 250,
                backgroundColor: 'green',
                padding: 15,
                marginTop: 70,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 7,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'gray',
                  fontSize: 18,
                  margin: 12,
                }}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
            style={{width: 150, height: 90, resizeMode: 'contain'}}
            source={{
              uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
            }}
          />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({});