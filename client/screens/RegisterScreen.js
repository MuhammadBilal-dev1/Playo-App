import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getRegisterationProgress,
  saveRegisterationProgress,
} from '../registerationUtils';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegisterationProgress('Register').then(progressData => {
      if (progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, []);

  const next = () => {
    if (email.trim() !== '') {
      saveRegisterationProgress('Register', {email});
    }
    navigation.navigate('Password');
  };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight || 0}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{padding: 13}}>
        <Text style={{fontSize: 25, fontWeight: '500'}}>
          You're Almost There
        </Text>

        <View style={{flexDirection: 'column', gap: 16, marginVertical: 40}}>
          <Text style={{fontSize: 19, color: 'gray'}}>Enter Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              padding: 15,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              borderRadius: 10,
            }}
          />

          <Pressable
            onPress={next}
            style={{
              padding: 15,
              backgroundColor: email?.length > 4 ? '#2dcf30' : '#E0E0E0',
              borderRadius: 8,
            }}>
            <Text style={{textAlign: 'center', fontSize: 19}}>Next</Text>
          </Pressable>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: '500', fontSize: 19}}>
            I agree to receive updates over Whatsapp
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: 'gray',
              textAlign: 'center',
              marginTop: 20,
            }}>
            By Signing up, you agree to the Terms of Service and Privacy and
            Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

