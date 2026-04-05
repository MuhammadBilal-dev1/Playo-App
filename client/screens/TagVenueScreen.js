import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameLogic } from '../hooks/useGameLogic';

const TagVenueScreen = () => {
  const [taggedVenue, setTaggedVenue] = useState(null);
  const navigation = useNavigation();
  const { venues } = useGameLogic();

  useEffect(() => {
    if (taggedVenue) {
      console.log('taggedVenue');
      navigation.navigate('Create');
    }
  }, [taggedVenue, navigation]);

  const handleSelectVenue = async venue => {
    setTaggedVenue(venue);
    await AsyncStorage.setItem('selectedVenue', JSON.stringify(venue));
    navigation.navigate('Create');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: '#294461',
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </Pressable>

          <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>
            Tag Venue
          </Text>
        </View>
      </View>

      <FlatList
        data={venues}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectVenue(item?.name)}
            style={{
              padding: 10,
              marginVertical: 8,
              borderColor: '#e0e0e0',
              borderWidth: 3,
              marginHorizontal: 10,
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'cover',
                    borderRadius: 7,
                  }}
                  source={{
                    uri: item?.image,
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 18, fontWeight: '500', width: '100%' }}
                  >
                    {item?.name}
                  </Text>

                  <Text style={{ marginTop: 5, color: 'gray', fontSize: 15 }}>
                    {item.location}
                  </Text>

                  <Text
                    style={{ marginTop: 8, fontWeight: '500', fontSize: 16 }}
                  >
                    4.4 (122 ratings)
                  </Text>
                </View>

                <Ionicons
                  name="shield-checkmark-sharp"
                  size={28}
                  color="green"
                />
              </View>

              <View style={{ paddingVertical: 5 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 17,
                  }}
                >
                  BOOKABLE
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default TagVenueScreen;
