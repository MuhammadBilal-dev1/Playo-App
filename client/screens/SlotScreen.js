import {
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Calendar from '../components/Calendar';
import moment from 'moment';
import { AuthContext } from '../AuthContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSlotLogic } from '../hooks/useSlotLogic';

import SportSelector from '../components/SportSelector';
import TimeDisplay from '../components/TimeDisplay';
import DurationPicker from '../components/DurationPicker';
import CourtSelector from '../components/CourtSelector';

const SlotScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { userId } = useContext(AuthContext);
  const isAdmin = userId === route?.params?.admin;

  const {
    courts,
    price,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedCourt,
    setSelectedCourt,
    selectedSport,
    setselectedSport,
    duration,
    setDuration,
    checkedTimes,
    handleTimePress,
    isSlotBooked,
  } = useSlotLogic(route);

  const calculateEndTime = (startTime, dur) => {
    if (!startTime) return '';
    return moment(startTime, 'h:mma').add(dur, 'minutes').format('hh:mm A');
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? 35 : 0,
        }}
      >
        <ScrollView>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              color="black"
            />
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              {route.params.place}
            </Text>
          </View>

          <View pointerEvents={isAdmin ? 'auto' : 'none'}>
            <SportSelector
              sports={route.params.sports}
              selectedSport={selectedSport}
              onSelectSport={isAdmin ? setselectedSport : () => {}}
              onClearCourt={isAdmin ? setSelectedCourt : () => {}}
            />
          </View>

          {selectedSport && (
            <View pointerEvents={isAdmin ? 'auto' : 'none'}>
              <ScrollView>
                <Calendar
                  selectedSport={selectedSport}
                  onSelectDate={setSelectedDate}
                  setSelectedTime={setSelectedTime}
                  selected={selectedDate}
                />
              </ScrollView>
            </View>
          )}

          <TimeDisplay
            startTime={route?.params?.startTime}
            selectedTime={selectedTime}
            endTime={route?.params?.endTime}
            calculateEndTime={calculateEndTime}
            duration={duration}
          />
          <View pointerEvents={isAdmin ? 'auto' : 'none'}>
            <DurationPicker duration={duration} setDuration={setDuration} />
          </View>

          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            Select Slot
          </Text>

          {selectedSport && (
            <ScrollView
              horizontal
              contentContainerStyle={{ marginHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              {checkedTimes?.map((item, index) => {
                const disabled = isSlotBooked(item.time);
                return (
                  <View key={index}>
                    {selectedTime.includes(item.time) ? (
                      <Pressable
                        disabled={!isAdmin || item.status === false || disabled}
                        onPress={() => {
                          if (isAdmin) setSelectedTime(item.time);
                        }}
                        style={{
                          margin: 10,
                          borderColor: '#1CAC78',
                          backgroundColor: '#29AB87',
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                          opacity: isAdmin ? 1 : 0.7,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          {item.time}
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        disabled={item.status === false}
                        onPress={() => handleTimePress(item.time)}
                        // onPress={() => setSelectedTime(item.time)}
                        style={{
                          margin: 10,
                          borderColor:
                            item.status === false || disabled
                              ? 'gray'
                              : '#1CAC78',
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          {item.time}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          )}

          <View pointerEvents={isAdmin ? 'auto' : 'none'}>
            <CourtSelector
              courts={courts}
              selectedCourt={selectedCourt}
              onSelectCourt={setSelectedCourt}
            />
          </View>

          {selectedCourt.length > 0 && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 20,
                fontSize: 15,
                fontWeight: '500',
              }}
            >
              Court Price : {price}$
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
      {isAdmin && (
        <Pressable
          onPress={() => {
            if (!selectedTime || selectedCourt.length === 0) {
              Alert.alert('Error', 'Please select a slot and a court first!');
              return;
            }
            navigation.navigate('Payment', {
              selectedCourt: selectedCourt[0],
              selectedSport: selectedSport,
              price: price,
              selectedTime: selectedTime,
              selectedDate: selectedDate,
              place: route.params.place,
              gameId: route?.params?.gameId,
            });
          }}
          style={{
            backgroundColor: '#32CD32',
            padding: 15,
            marginBottom: 30,
            borderRadius: 10,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
          >
            Next
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default SlotScreen;
