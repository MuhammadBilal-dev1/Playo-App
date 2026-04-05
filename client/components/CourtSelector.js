import React from 'react';
import { View, Pressable, Text } from 'react-native';

const CourtSelector = ({ courts, selectedCourt, onSelectCourt }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {courts.map((item) =>
          item.courts.map((court, index) => {
            const isSelected = selectedCourt.includes(court.name);
            return (
              <Pressable
                key={index}
                onPress={() => onSelectCourt(court.name)}
                style={{
                  backgroundColor: isSelected ? '#00A86B' : 'transparent',
                  borderColor: '#00A86B',
                  borderRadius: 6,
                  padding: 15,
                  borderWidth: isSelected ? 0 : 1,
                  width: 180,
                  margin: 10,
                }}>
                <Text style={{ textAlign: 'center', color: isSelected ? 'white' : '#00A86B' }}>
                  {court.name}
                </Text>
              </Pressable>
            );
          })
        )}
      </View>
    </View>
  );
};

export default CourtSelector;