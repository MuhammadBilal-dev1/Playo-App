import React from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SportSelector = ({ sports, selectedSport, onSelectSport, onClearCourt }) => {
  return (
    <ScrollView
      contentContainerStyle={{ marginLeft: 'auto' }}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {sports.map((item, index) => {
        const isSelected = selectedSport.includes(item.name);
        return (
          <View key={index}>
            <Pressable
              onPress={() => {
                onSelectSport(item.name);
                onClearCourt([]);
              }}
              style={{
                borderColor: isSelected ? 'green' : '#686868',
                margin: 10,
                padding: 20,
                width: 80,
                height: 90,
                borderWidth: isSelected ? 3 : 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                style={{ textAlign: 'center' }}
                name={item.icon}
                size={24}
                color="gray"
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  width: 80,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {item.name}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SportSelector;