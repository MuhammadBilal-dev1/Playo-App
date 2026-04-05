import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateModal from '../components/DateModal';
import InputRow from '../components/InputRow';
import AccessSelector from '../components/AccessSelector';
import InstructionItem from '../components/InstructionItem';
import { useGameLogic } from '../hooks/useGameLogic';

const CreateActivity = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(['Public']);
  const [modalVisible, setModalVisible] = useState(false);
  const [sport, setSport] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  const [noOfPlayers, setnoOfPlayers] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [taggedVenue, setTaggedVenue] = useState('');
  const { createGame, loading } = useGameLogic();
  const arrowIcon = Platform.OS === 'web' ? 'arrow-right' : 'arrowright';

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      let displayDate;
      if (i === 0) {
        displayDate = 'Today';
      } else if (i === 1) {
        displayDate = 'Tomorrow';
      } else if (i === 2) {
        displayDate = 'Day after';
      } else {
        displayDate = date.format('Do MMMM');
      }
      dates.push({
        id: i.toString(),
        displayDate,
        dayOfWeek: date.format('dddd'),
        actualDate: date.format('Do MMMM'),
      });
    }
    return dates;
  };
  const dates = generateDates();

  useEffect(() => {
    const fetchTimeInterval = async params => {
      const savedTimeInterval = await AsyncStorage.getItem('timeInterval');
      if (savedTimeInterval) {
        setTimeInterval(JSON.parse(savedTimeInterval));
      }
    };
    const fetchVenue = async params => {
      const savedVenue = await AsyncStorage.getItem('selectedVenue');
      if (savedVenue) {
        setTaggedVenue(JSON.parse(savedVenue));
      }
    };
    const fetchDate = async params => {
      const settingdate = await AsyncStorage.getItem('date');
      setDate(settingdate);
    };

    fetchVenue();
    fetchTimeInterval();
    fetchDate();
  }, []);

  const handleCreateGame = async () => {
    const success = await createGame({
      sport,
      taggedVenue,
      date,
      timeInterval,
      noOfPlayers,
    });

    if (success) {
      // Form reset logic
      setSport('');
      setArea('');
      setDate('');
      setTimeInterval('');
      setnoOfPlayers('');
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? 45 : 0,
        }}
      >
        <StatusBar backgroundColor="red" />
        <ScrollView>
          <View style={{ marginHorizontal: 10 }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              {loading ? 'Creating...' : 'Create Activity'}
            </Text>

            <InputRow
              label="Area"
              icon={<Entypo name="location" size={24} color="gray" />}
              value={area || taggedVenue}
              onChangeText={setArea}
              onPress={() => navigation.navigate('TagVenue')}
              placeholder="Locality or venue name"
            />

            <InputRow
              label="Date"
              icon={<Feather name="calendar" size={24} color="gray" />}
              value={date}
              editable={false}
              onPress={() => setModalVisible(true)}
              placeholder="Pick a Day"
            />

            <InputRow
              label="Time"
              icon={<Ionicons name="time-outline" size={24} color="gray" />}
              value={timeInterval}
              editable={false}
              onPress={() => navigation.navigate('Time')}
              placeholder="Pick Exact Time"
            />

            <InputRow
              label="Sport"
              icon={
                <MaterialCommunityIcons name="whistle" size={24} color="gray" />
              }
              value={sport}
              onChangeText={setSport}
              placeholder="Eg Badminton / Footbal / Cricket"
            />

            <AccessSelector selected={selected} setSelected={setSelected} />

            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 0.7,
                height: 1,
                marginTop: 7,
              }}
            />

            <Text style={{ marginTop: 20, fontSize: 20 }}>Total Players</Text>

            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}
            >
              <View style={{ marginVertical: 5 }}>
                <View>
                  <TextInput
                    value={noOfPlayers}
                    onChangeText={setnoOfPlayers}
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderColor: '#D0D0D0',
                      fontSize: 17,
                      borderWidth: 1,
                    }}
                    placeholder="Total Players (including you)"
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 0.7,
                height: 1,
                marginTop: 12,
              }}
            />

            <Text style={{ marginTop: 20, fontSize: 20 }}>
              Add Instructions
            </Text>

            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}
            >
              <InstructionItem
                icon={<Ionicons name="bag-check" size={26} color="red" />}
                label="Bring your own equipment"
              />
              <InstructionItem
                icon={
                  <MaterialCommunityIcons
                    name="directions-fork"
                    size={26}
                    color="#FEBE10"
                  />
                }
                label="Cost Shared"
              />
              <InstructionItem
                icon={<FontAwesome5 name="syringe" size={26} color="green" />}
                label="Covid Vaccinated preferred"
              />

              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginVertical: 8,
                  borderRadius: 6,
                  fontSize: 17,
                }}
                placeholder="Add Additional Instructions"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 10,
              }}
            >
              <AntDesign name="setting" size={30} color="black" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>
                  Advanced Settings
                </Text>
              </View>
              <AntDesign name={arrowIcon} size={30} color="gray" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={handleCreateGame}
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          {loading ? 'Creating...' : 'Create Activity'}
        </Text>
      </Pressable>

      {/* Modal for Date Selection */}
      <DateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        dates={dates}
        onSelectDate={async val => {
          setDate(val);
          setModalVisible(false);
          await AsyncStorage.setItem('date', val);
        }}
      />
    </>
  );
};

export default CreateActivity;
