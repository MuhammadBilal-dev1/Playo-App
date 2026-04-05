import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { usePayment } from '../hooks/usePayment';

const PaymentScreen = () => {
  const route = useRoute();
  const { userId } = useContext(AuthContext);
  const total = route.params.price + 8.8;
  const params = route.params;

  const { bookSlot, loading } = usePayment({
    ...params,
    userId,
    gameId: params?.gameId,
  });

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 23, fontWeight: '500', color: 'green' }}>
            {params?.selectedSport}
          </Text>

          <View
            style={{
              borderColor: '#E0E0E0',
              borderWidth: 1,
              padding: 10,
              marginTop: 10,
              borderRadius: 6,
              shadowColor: '#171717',
              shadowOffset: { width: -1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <MaterialCommunityIcons
                  name="fireplace-off"
                  size={20}
                  color="black"
                />
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                  {params?.selectedCourt}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <Feather name="calendar" size={20} color="black" />
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                  {params?.selectedDate}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <Feather name="clock" size={20} color="black" />
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                  {params?.selectedTime}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={20}
                  color="black"
                />
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                  {params?.price}$
                </Text>
              </View>
            </View>

            <Pressable></Pressable>
          </View>
        </View>

        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
            >
              <Text>Court Price</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              {params?.price}$
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 15,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
            >
              <Text>Convenience Fee</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>8.8$</Text>
          </View>
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#E0E0E0',
            borderWidth: 3,
            marginTop: 20,
          }}
        />

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 16 }}>Total Amount</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'green' }}>
            {total}$
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            borderColor: '#C0C0C0',
            borderWidth: 2,
            padding: 8,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 16 }}>Total Amount</Text>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              To be paid at Venue
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 16 }}>{total}$</Text>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>{total}$</Text>
          </View>
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#E0E0E0',
            borderWidth: 3,
            marginTop: 20,
          }}
        />
        <View
          style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}
        >
          <Image
            style={{ width: 100, height: 80, resizeMode: 'contain' }}
            source={{
              uri: 'https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v2%2FLogo%2Bwith%2BTrademark_Filled.png%3Fq%3D20%26format%3Dauto&w=3840&q=75',
            }}
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={bookSlot}
        style={{
          backgroundColor: '#32CD32',
          padding: 15,
          marginBottom: 30,
          borderRadius: 6,
          marginHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
          {total}$
        </Text>
        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
          Proceed to Pay
        </Text>
      </Pressable>
    </>
  );
};

export default PaymentScreen;
