import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Amenities = ({ services }) => {
  console.log(services);
  
  return (
    <View style={{ padding: 10 }}>
      {services && services.length > 0 && (
        <Text style={{ fontSize: 17, fontWeight: '500' }}>
          Most Popular Facilities
        </Text>
      )}

      <View
        style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
      >
        {/* Sirf tab render karo jab services exist karein AUR uski length 0 se zyada ho */}
        {services &&
          services.length > 0 &&
          services.map((item, index) => (
            <View
              key={index}
              style={{
                margin: 10,
                backgroundColor: '#17B169',
                paddingHorizontal: 11,
                paddingVertical: 5,
                borderRadius: 25,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{item}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Amenities;

