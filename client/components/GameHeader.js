import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GameHeader = ({ navigation, sport, matchFull, isHost, toggleStatus, gameData, venue, startTime, endTime }) => (
  
  <View
            style={{
              paddingTop: 25,
              padding: 10,
              backgroundColor: '#294461',
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </Pressable>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
              >
                <Entypo name="share" size={28} color="white" />
                <Entypo name="dots-three-vertical" size={28} color="white" />
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}
              >
                {sport}
              </Text>

              <View
                style={{
                  padding: 7,
                  backgroundColor: 'white',
                  borderRadius: 7,
                  alignSelf: 'flex-start',
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '600' }}>Regular</Text>
              </View>

              {/* Only Host/Admin can see toggle */}
              {isHost ? (
                <View
                  style={{
                    marginLeft: 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8, 
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: '600', color: 'white' }}
                  >
                    Match Full
                  </Text>
                  <FontAwesome
                    onPress={() => toggleStatus()}
                    name={
                      matchFull || gameData?.matchFull
                        ? 'toggle-on'
                        : 'toggle-off'
                    }
                    size={30}
                    color="white"
                  />
                </View>
              ) : (
                (matchFull || gameData?.matchFull) && (
                  <View
                    style={{
                      marginLeft: 'auto',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                      borderRadius: 20, 
                      borderWidth: 1,
                      borderColor: '#FF4D4D', 
                    }}
                  >
                    <Text
                      style={{
                        color: '#FF4D4D',
                        fontWeight: '700',
                        fontSize: 12, 
                        textTransform: 'uppercase',
                      }}
                    >
                      Match Full
                    </Text>
                  </View>
                )
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 17, color: 'white', fontWeight: '500' }}>
                {gameData?.time} • {gameData?.date}
              </Text>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate('Slot', {
                  place: gameData?.area, 
                  admin: gameData?.admin,
                  sports: venue?.sportsAvailable || [], 
                  date: gameData?.date,
                  slot: gameData?.time,
                  startTime: startTime,
                  endTime: endTime,
                  gameId: gameData?._id,
                  bookings: venue?.bookings,
                  admin: gameData?.adminId
                })
              }
              style={{
                backgroundColor: '#28c752',
                paddingLeft: 45,
                paddingRight: 45,
                paddingVertical: 10,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                width: '90%',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <Entypo name="location" size={30} color="white" />

              <View>
                <Text style={{ color: 'white', fontSize: 17 }}>
                  {gameData?.area}
                </Text>
              </View>
            </Pressable>
          </View>
);

export default GameHeader;