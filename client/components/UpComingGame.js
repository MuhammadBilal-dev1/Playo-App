import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UpComingGame = ({item}) => {
  console.log('item', item);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Game', {
          item: item,
        })
      }
      style={{
        backgroundColor: 'white',
        padding: 12,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 2,
        marginBottom: 20,
      }}>
      <Text
        style={{
          marginVertical: 7,
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 2,
          color: 'blue',
          fontSize: 17,
          fontWeight: '500',
        }}>
        {item?.date}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          backgroundColor: 'white',
          marginTop: 12,
        }}>
        {/* Admin Image */}
        <View>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={{uri: item?.adminUrl}}
          />
        </View>

        {/* Main Content */}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              flexWrap: 'wrap', // Allow text to wrap if it overflows
              marginBottom: 6,
              fontSize: 17,
            }}>
            {item?.adminName}'s Badminton Game
          </Text>

          <Text
            style={{
              color: 'gray',
              marginBottom: 10,
              flexShrink: 1, // Allow text to shrink if it overflows
              fontSize: 16,
            }}
            numberOfLines={2} // Limit the number of lines to prevent overflow
          >
            {item?.area}
          </Text>

          <View
            style={{
              marginVertical: 10,
              padding: item?.isBooked ? 0 : 15,
              borderRadius: 8,
              borderColor: '#E0E0E0',
              borderWidth: 2,
              width: '100%', // Take full width of its parent container
            }}>
            {item?.isBooked ? (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 13,
                    paddingVertical: 10,
                  }}>
                  {item?.courtNumber}
                </Text>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#56cc79',
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{fontSize: 13, fontWeight: '500', color: 'white'}}>
                    Booked
                  </Text>
                </View>
              </>
            ) : (
              <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 16,}}>
                {item?.time}
              </Text>
            )}
          </View>
        </View>

        {/* Player Count */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {item?.players?.length}
          </Text>
          <Text style={{fontSize: 18, fontWeight: '600', marginTop: 8}}>
            GOING
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UpComingGame;

