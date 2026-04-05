import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const ExpenseCard = () => (
  <View
    style={{
      marginVertical: 20,
      marginHorizontal: 15,
      backgroundColor: 'white',
      padding: 10,
      flexDirection: 'row',

      gap: 10,
    }}
  >
    <MaterialCommunityIcons name="directions-fork" size={28} color="#adcf17" />

    <View>
      <Text style={{ fontSize: 18 }}>Add Expense</Text>

      <View
        style={{
          marginTop: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ width: '80%', color: 'gray', fontSize: 16 }}>
          Start adding your expenses to split cost among players
        </Text>

        <Entypo name="chevron-small-right" size={35} color="gray" />
      </View>
    </View>
  </View>
);

export default ExpenseCard;
