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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getRegisterationProgress,
  saveRegisterationProgress,
} from '../registerationUtils';

const NameScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    getRegisterationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);

  const saveName = () => {
    if (firstName.trim() !== '') {
      saveRegisterationProgress('Name', {firstName, lastName});
    }
    navigation.navigate('Image');
  };
  return (
 
    <>
      <SafeAreaView
        style={{
                  flex: 1,
                  backgroundColor: 'white',
                  paddingTop: Platform.OS === 'android' ? 45 : 0,
                }}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{marginHorizontal: 10}}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
        </View>

        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Complete Your Profile
          </Text>

          <Text style={{marginTop: 10, color: 'gray', fontSize: 18}}>
            What would you like your mates to call you? ❤️
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            marginVertical: 25,
            flexDirection: 'column',
            gap: 20,
          }}>
          <View>
            <Text style={{fontSize: 19, color: 'gray'}}>First Name *</Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={{
                padding: 18,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>

          <View>
            <Text style={{fontSize: 19, color: 'gray'}}>Last Name</Text>

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={{
                padding: 18,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <Pressable
        onPress={saveName}
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
          }}>
          NEXT
        </Text>
      </Pressable>
    </>
  );
};

export default NameScreen;

