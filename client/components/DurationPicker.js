import React from 'react';
import { View, Pressable, Text } from 'react-native';

const DurationPicker = ({ duration, setDuration }) => {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}>Duration</Text>
      <Pressable
        style={{
          gap: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Pressable
          onPress={() => setDuration(Math.max(60, duration - 60))}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderColor: 'gray',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>-</Text>
        </Pressable>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}>{duration} min</Text>
        <Pressable
          onPress={() => setDuration(duration + 60)}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderColor: 'gray',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>+</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default DurationPicker;