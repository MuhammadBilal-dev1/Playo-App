import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../config';
import { useGameLogic } from '../hooks/useGameLogic';

const ManageRequests = () => {
  const [option, setOption] = useState('Requests');
  const route = useRoute();
  const navigation = useNavigation();
  const userId = route?.params?.userId;
  const gameId = route?.params?.gameId;
  const {
    fetchPlayers,
    fetchRequests,
    requests,
    players,
    acceptRequest,
    loading,
  } = useGameLogic(gameId);

  const handleAccept = async userId => {
    const result = await acceptRequest(userId);
    if (result.success) {
      Alert.alert('Success', 'Request accepted');
    } else {
      Alert.alert('Error', 'Failed to accept request');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    >
      <View style={{ padding: 12, backgroundColor: '#223536', paddingTop: 25 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </Pressable>
          <AntDesign name="plussquareo" size={28} color="white" />
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: '600', color: 'white' }}>
            Manage
          </Text>

          <View>
            <Text style={{ color: 'white', fontSize: 19 }}>Match Full</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 15,
          }}
        >
          <Pressable onPress={() => setOption('Requests')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Requests' ? '#1dd132' : 'white',
                fontSize: 17,
              }}
            >
              {/* Requests ({route?.params?.requests?.length}) */}
              Requests ({requests?.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Invited')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Invited' ? '#1dd132' : 'white',
                fontSize: 17,
              }}
            >
              Invited (0)
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Playing')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Playing' ? '#1dd132' : 'white',
                fontSize: 17,
              }}
            >
              Playing({players?.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Retired')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Retired' ? '#1dd132' : 'white',
                fontSize: 17,
              }}
            >
              Retired(0)
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <View>
          {option == 'Requests' && (
            <View>
              {/* {route?.params?.requests?.map((item, index) => ( */}
              {requests?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 6,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 13,
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                      source={{ uri: item?.image }}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: '600', fontSize: 20 }}>
                        {item?.firstName} {item?.lastName}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          marginTop: 10,
                          borderRadius: 20,
                          borderColor: 'orange',
                          borderWidth: 1,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 15 }}>INTERMEDIATE</Text>
                      </View>
                    </View>

                    <View>
                      <Image
                        style={{
                          width: 120,
                          height: 70,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
                        }}
                      />
                    </View>
                  </View>

                  <Text style={{ marginTop: 10, fontSize: 19 }}>
                    {item?.comment}
                  </Text>

                  <View
                    style={{
                      height: 1,
                      borderColor: '#E0E0E0',
                      borderWidth: 0.7,
                      marginVertical: 15,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          backgroundColor: '#E0E0E0',
                          borderRadius: 5,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 16, color: 'gray' }}>
                          0 NO SHOWS
                        </Text>
                      </View>

                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                          fontSize: 16,
                        }}
                      >
                        See Reputation
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <Pressable
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          borderColor: '#E0E0E0',
                          borderWidth: 1,
                          width: 100,
                        }}
                      >
                        <Text style={{ textAlign: 'center', fontSize: 17 }}>
                          RETIRE
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => handleAccept(item.userId)}
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          backgroundColor: loading? 'gray' : '#26bd37',
                          width: 100,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 17,
                          }}
                        >
                          {loading ? 'loading...' : 'ACCEPT'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <View>
          {option == 'Playing' && (
            <>
              <View style={{}}>
                {players?.map((item, index) => (
                  <Pressable
                    key={index}
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item?.image }}
                      />
                    </View>

                    <View>
                      <Text>
                        {item?.firstName} {item?.lastName}
                      </Text>

                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          marginTop: 10,
                          borderRadius: 20,
                          borderColor: 'orange',
                          borderWidth: 1,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 13, fontWeight: '400' }}>
                          INTERMEDIATE
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageRequests;
