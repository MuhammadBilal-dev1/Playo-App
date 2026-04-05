import React from 'react';
import { View, Pressable, Text } from 'react-native';

const TimeDisplay = ({ startTime, selectedTime, endTime, calculateEndTime, duration }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        margin: 10,
      }}>
      <Pressable
        style={{
          borderColor: '#E0E0E0',
          borderWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 60,
          flex: 1,
        }}>
        <Text style={{ fontSize: 13, fontWeight: '400', textAlign: 'center' }}>TIME</Text>
        <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', marginTop: 8 }}>
          {startTime ? startTime : selectedTime.length > 0 ? selectedTime : 'Choose Time'}
        </Text>
      </Pressable>
      <Pressable
        style={{
          borderColor: '#E0E0E0',
          borderWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 60,
          flex: 1,
          marginRight: 20,
        }}>
        <Text style={{ fontSize: 13, fontWeight: '400', textAlign: 'center' }}>TIME</Text>
        <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', marginTop: 8 }}>
          {endTime ? endTime : selectedTime.length > 0 ? calculateEndTime(selectedTime, duration) : 'Choose Time'}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default TimeDisplay;