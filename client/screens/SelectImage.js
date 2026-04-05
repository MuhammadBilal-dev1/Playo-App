import {
  Image,
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
import axios from 'axios';

const SelectImage = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];

  useEffect(() => {
    getRegisterationProgress('Image').then(progressData => {
      if (progressData) {
        setImage(progressData.image || '');
      }
    });
  }, []);

  const saveImage = () => {
    if (image.trim() !== '') {
      saveRegisterationProgress('Image', {image});
    }
    navigation.navigate('PreFinal');
  }; 

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight || 0,
          backgroundColor: 'white',
        }}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{marginHorizontal: 10}}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={32}
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

        <View style={{marginVertical: 25}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderColor: 'green',
                borderWidth: 2,
                resizeMode: 'cover',
              }}
              source={{uri: image ? image : images[0]?.image}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 25,
              justifyContent: 'center',
            }}>
            {images?.map((item, index) => (
              <Pressable
                onPress={() => setImage(item?.image)}
                style={{margin: 10, gap: 10}}
                key={index}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderColor: image == item?.image ? 'green' : 'transparent',
                    borderWidth: 2,
                    resizeMode: 'contain',
                  }}
                  source={{uri: item.image}}
                />
              </Pressable>
            ))}
          </View>

          <Text style={{textAlign: 'center', color: 'gray', fontSize: 20}}>
            OR
          </Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                Enter Image link
              </Text>

              <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="Image link"
                style={{
                  padding: 18,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                  fontSize: 17,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Pressable
        onPress={saveImage}
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

export default SelectImage;

