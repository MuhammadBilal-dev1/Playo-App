import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../AuthContext';
import {getRegisterationProgress} from '../registerationUtils';
import {screensEnabled} from 'react-native-screens';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { API_URL } from '../config';

const PreFinalScreen = () => {
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  useEffect(() => {
    getAllScreenData();
  }, []);

  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];

      let userData = {};

      for (const screenName of screens) {
        const screenData = await getRegisterationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }

      setUserData(userData);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];

      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }

      console.log('All screen data cleared!');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios
        .post(`${API_URL}/users/register`, userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          setToken(token)
          console.log('token: ', token);
          
        });

      clearAllScreenData();
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{marginTop: 150, height: '72%'}}>
        <Text
          style={{
            fontSize: 37,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 37,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={{backgroundColor: '#03C03C', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 20,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;
