import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Amenities from '../components/Amenities';

const VenueInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { venue } = route.params;
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? 45 : 0,
        }}
      >
        <StatusBar barStyle={'dark-content'} />
        <ScrollView>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 15,
              //   backgroundColor: 'white',
              backgroundColor: 'green',
              elevation: 2,
            }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 5 }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}
            >
              Venue Info 
            </Text>
            <View style={{ width: 40 }} />
          </View>
          <>
            <View>
              <Image
                style={{ width: '100%', height: 300, resizeMode: 'cover' }}
                source={{
                  uri: venue.image,
                }}
              />
            </View>

            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 17 }}>{venue?.name}</Text>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Ionicons name="time-outline" size={28} color={'black'} />

                <Text
                  style={{ fontSize: 16, fontWeight: '500', paddingLeft: 5 }}
                >
                  {venue?.timings}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  marginVertical: 8,
                  marginTop: 10,
                }}
              >
                <Ionicons name="location-outline" size={28} color={'k'} />
                <Text style={{ fontSize: 15, width: '80%', fontWeight: '500' }}>
                  {venue?.location}
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
                  {[0, 0, 0, 0].map((en, i) => (
                    <FontAwesome
                      key={i}
                      style={{ paddingHorizontal: 3, fontSize: 18 }}
                      name={
                        i < Math.floor(venue?.avgRating) ? 'star' : 'star-o'
                      }
                      size={15}
                      color={'#FFD700'}
                    />
                  ))}
                  <Text style={{ fontSize: 15 }}>
                    ({venue?.rating} ratings)
                  </Text>
                </View>

                <Pressable
                  style={{
                    marginTop: 6,
                    width: 160,
                    borderColor: '#6868686',
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <Text>Rate Venue</Text>
                </Pressable>
              </View>

              <View>
                <View>
                  <Text>{venue?.totalActivities || 0} total Activities</Text>
                </View>

                <Pressable
                  style={{
                    marginTop: 6,
                    width: 160,
                    borderColor: '#6868686',
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <Text>1 Upcoming</Text>
                </Pressable>
              </View>
            </View>
            {venue?.sportsAvailable && venue?.sportsAvailable.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    marginHorizontal: 10,
                    fontWeight: '500',
                  }}
                >
                  Sports Available
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {venue?.sportsAvailable?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        borderColor: '#686868',
                        margin: 10,
                        padding: 20,
                        width: 130,
                        height: 90,
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        style={{ textAlign: 'center' }}
                        name={item.icon}
                        size={28}
                        color={'gray'}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginTop: 10,
                        }}
                      >
                        {item?.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <Amenities services={venue?.facilities} />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Activities
              </Text>

              <Pressable
                style={{
                  borderColor: '#787878',
                  marginTop: 18,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <AntDesign name="plus" size={28} color={'black'} />
                <Text style={{ fontSize: 17 }}>Create Activity</Text>
              </Pressable>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>

      <Pressable
        style={{
          backgroundColor: 'green',
          padding: 8,
          marginBottom: 30,
          borderRadius: 10,
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 17,
          }}
        >
          Book Now
        </Text>
      </Pressable>
    </>
  );
};

export default VenueInfoScreen;
