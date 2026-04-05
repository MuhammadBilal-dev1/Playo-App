import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Platform } from 'react-native';
import { API_URL } from '../config';
import { useLocation } from '../hooks/useLocation';
import { useUser } from '../hooks/useUser';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setToken, setUserId, token, userId } = useContext(AuthContext);
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { cityName, locationLoading } = useLocation();
  const { user, loading: userLoading } = useUser(userId);
  const iconName = Platform.OS === 'web' ? 'usergroup-add' : 'addusergroup';
  console.log("iconName", iconName);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View>
          <Text style={{ marginLeft: 15, fontSize: 17 }}>
            {locationLoading ? 'Loading...' : cityName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginRight: 15,
          }}
        >
          <Ionicons name="chatbox-outline" size={28} color="black" />
          <Ionicons name="notifications-outline" size={28} color="black" />

          <Pressable onPress={clearAuthToken}>
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri: user?.user?.image,
              }}
            />
          </Pressable>
        </View>
      ),
    });
  }, [user, cityName]);

  const data = [
    {
      id: '10',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/Tennis%20Spotlight.png',
      text: 'Learn Tennis',
      description: 'Know more',
    },
    {
      id: '11',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_08.png',
      text: 'Up Your Game',
      description: 'Find a coach',
    },
    {
      id: '12',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_03.png',
      text: 'Hacks to win',
      description: 'Yes, Please!',
    },
    {
      id: '13',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_02.png',
      text: 'Spotify Playolist',
      description: 'Show more',
    },
  ];

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');

      setToken('');
      setUserId('');
      navigation.replace('Start');
    } catch (error) {
      console.log('Error', error);
    }
  };

  if (userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#12e04c" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <View
          style={{
            padding: 13,
            backgroundColor: 'white',
            margin: 15,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 8,
          }}
        >
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 25 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/785/785116.png',
              }}
            />
          </View>

          <View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Text>Set Your Weekly Fit Goal</Text>
              <Image
                style={{ width: 20, height: 20, borderRadius: 10 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/426/426833.png',
                }}
              />
            </View>

            <Text style={{ marginTop: 8, color: 'gray' }}>
              KEEP YOURSELF FIT
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 13,
            backgroundColor: 'white',
            marginVertical: 6,
            marginHorizontal: 13,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              backgroundColor: '#E0E0E0',
              borderRadius: 4,
              width: 200,
              marginVertical: 5,
            }}
          >
            <Text style={{ color: '#484848', fontSize: 13 }}>
              GEAR UP FOR YOUR GAME
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 16 }}>Badminton Activity</Text>

            <Pressable
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 7,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                width: 80,
                elevation: 8,
              }}
            >
              <Text style={{ textAlign: 'center' }}>View</Text>
            </Pressable>
          </View>

          <Text style={{ marginTop: 4, color: 'gray' }}>
            You have no Games Today
          </Text>

          <Pressable
            onPress={() =>
              navigation.navigate('PLAY', { initialOption: 'Calendar' })
            }
            style={{
              marginTop: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}
            >
              View My Calender
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            padding: 13,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Pressable>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 120,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
              />
            </View>

            <Pressable
              style={{
                backgroundColor: 'white',
                padding: 12,
                width: 180,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Play</Text>
                <Text style={{ fontSize: 15, color: 'gray', marginTop: 7 }}>
                  Find Players and join their activities
                </Text>
              </View>
            </Pressable>
          </Pressable>
          <Pressable>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 120,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
              />
            </View>

            <Pressable
              style={{
                backgroundColor: 'white',
                padding: 12,
                width: 180,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Book</Text>
                <Text style={{ fontSize: 15, color: 'gray', marginTop: 7 }}>
                  Book your slots in venues nearby
                </Text>
              </View>
            </Pressable>
          </Pressable>
        </View>

        <View style={{ padding: 13 }}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#29AB87',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AntDesign name={iconName} size={28} color="green" />
            </View>

            <View>
              <Text style={{ fontWeight: 'bold' }}>Groups</Text>
              <Text style={{ marginTop: 10, color: 'gray' }}>
                Connect,Compete and Discuss
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
              gap: 10,
              marginTop: 15,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'yellow',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="tennisball-outline" size={28} color="green" />
            </View>

            <View>
              <Text style={{ fontWeight: 'bold' }}>Game Time Activities</Text>
              <Text style={{ marginTop: 10, color: 'gray' }}>
                355 Playo hosted games
              </Text>
            </View>
          </View>
        </View>

        <View style={{ padding: 13 }}>
          <View
            style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}
          >
            <Text style={{ fontSize: 15, fontWeight: '500' }}>SpotLight</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data?.map((item, index) => (
                <ImageBackground
                  key={index}
                  imageStyle={{ borderRadius: 10 }}
                  style={{
                    width: 220,
                    height: 280,
                    resizeMode: 'contain',
                    marginRight: 10,
                    marginVertical: 15,
                  }}
                  source={{ uri: item?.image }}
                ></ImageBackground>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              style={{ width: 120, height: 70, resizeMode: 'contain' }}
              source={{
                uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
              }}
            />
          </View>

          <Text style={{ color: 'gray', textAlign: 'center' }}>
            Your Sports community app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
