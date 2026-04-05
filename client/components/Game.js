import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import {jwtDecode} from 'jwt-decode';

const Game = ({item}) => {
  const [userId, setuserId] = useState(null);
  const navigation = useNavigation();
  console.log('Game', item);
  const {token, setUserId} = useContext(AuthContext);
  const isUserInRequests = item?.requests.some(
    request => request.userId === userId,
  );
  console.log(item);
  
  const fetchUserId = async () => {
    try {
      // Check karein ke token null ya undefined to nahi
      if (token && token !== 'undefined') {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
          setuserId(decodedToken.userId);
        }
      }
    } catch (error) {
      console.log('Token decode karne mein masla:', error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Game', {
          item: item,
        })
      }
      style={{
        marginVertical: 10,
        marginHorizontal: 14,
        padding: 14,
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'gray', fontSize: 18, fontWeight: '900'}}>
          Regular
        </Text>
        <Feather name="bookmark" size={30} color="black" />
      </View>

      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 56, height: 56, borderRadius: 28}}
              source={{uri: item?.adminUrl}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -7,
              }}>
              {item?.players
                ?.filter(c => c?.name !== item?.adminName)
                .map((player, index) => (
                  <Image
                    key={index} // Adding a key prop is important for mapping in React
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      marginLeft: -7,
                    }}
                    source={{uri: player?.imageUrl}}
                  />
                ))}
            </View>
          </View>

          <View style={{marginLeft: 10, flex: 1}}>
            {/* Adjust the marginLeft value to space out the text */}
            <Text style={{fontSize: 17, fontWeight: '900'}}>
              • {item?.players.length}/{item?.totalPlayers} Going
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              backgroundColor: '#fffbde',
              borderRadius: 8,
              borderColor: '#EEDC82',
              borderWidth: 1,
            }}>
            <Text style={{fontWeight: '800', fontSize: 17}}>
              Only {item?.totalPlayers - item?.players.length} slots left 🚀
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{marginTop: 10, color: 'gray', fontSize: 17}}>
              {item?.adminName} | 321 Karma | On Fire
            </Text>

            <Text style={{marginTop: 10, fontSize: 17, fontWeight: '500'}}>
              {item?.date}, {item?.time}
            </Text>
          </View>

          {item?.matchFull && (
            <Image
              style={{width: 100, height: 70, resizeMode: 'contain'}}
              source={{
                uri: 'https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmatch_full.png&w=256&q=75',
              }}
            />
          )}
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
          }}>
          <MaterialIcons name="location-on" size={30} color="red" />
          <Text
            style={{fontSize: 15, flex: 1, fontSize: 17}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item?.area}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: '#E0E0E0',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 7,
              marginTop: 12,
              alignSelf: 'flex-start', // This line ensures the width is based on the content
            }}>
            <Text style={{fontSize: 17, fontWeight: '600'}}>
              Intermediate to Advanced
            </Text>
          </View>
          {isUserInRequests && (
            <View
              style={{
                backgroundColor: '#4ba143',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Requested
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default Game;

