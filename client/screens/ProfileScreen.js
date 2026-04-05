import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import { API_URL } from '../config';

const ProfileScreen = () => {
  const { token, setToken, setUserId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(
        'Profile Fetch Error:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'User data load nahi ho saka');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const logoutAction = async () => {
      try {
        // Dono storage items clear karein
        await AsyncStorage.multiRemove(['token', 'userId']);

        // State reset karein
        setToken(null);
        setUserId('');

        // Navigation (Ensure karein ke navigation object available ho)
        navigation.replace('Start');
      } catch (error) {
        console.log('Logout Error:', error);
      }
    };

    if (Platform.OS === 'web') {
      // Web par Alert.alert nahi chalta, isliye window.confirm use karein
      const confirmed = window.confirm('Do you want to logout?');
      if (confirmed) {
        await logoutAction();
      }
    } else {
      // Mobile ke liye native Alert
      Alert.alert('Logout', 'Do you want to logout?', [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: logoutAction,
        },
      ]);
    }
  };

  if (loading) {
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
        paddingTop: Platform.OS === 'android' ? 50 : 0,

        
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri:
                  user?.image ||
                  'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#f0f0f0',
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={{ color: '#666', marginTop: 2 }}>
                Member since {new Date(user?.createdAt).getFullYear()}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Row (Sirf wahi jo DB mein hain) */}
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            backgroundColor: '#f9f9f9',
            margin: 20,
            borderRadius: 15,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
              {user?.noOfGames || 0}
            </Text>
            <Text style={{ color: '#888', fontSize: 12 }}>Games</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              borderLeftWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
              {user?.sports?.length || 0}
            </Text>
            <Text style={{ color: '#888', fontSize: 12 }}>Sports</Text>
          </View>
        </View>

        {/* Account Info Section */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#999',
              marginVertical: 10,
              textTransform: 'uppercase',
            }}
          >
            Account Details
          </Text>

          <View style={optionRowStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="email-outline" size={24} color="#000" />
              <Text style={{ marginLeft: 15, fontSize: 16, color: '#333' }}>
                Email
              </Text>
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>{user?.email}</Text>
          </View>

          <View style={optionRowStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="medal-outline" size={24} color="#000" />
              <Text style={{ marginLeft: 15, fontSize: 16, color: '#333' }}>
                Sports Interested
              </Text>
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>
              {user?.sports?.length || 0}
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 40,
              paddingBottom: 20,
            }}
            onPress={handleLogout}
          >
            <Icon name="logout" size={24} color="#FF3B30" />
            <Text
              style={{
                color: '#FF3B30',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 15,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const optionRowStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 15,
  borderBottomWidth: 0.5,
  borderBottomColor: '#eee',
};

export default ProfileScreen;
