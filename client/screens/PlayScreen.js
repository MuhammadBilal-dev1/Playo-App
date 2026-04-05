import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';
import Geo from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import Game from '../components/Game';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';
import UpComingGame from '../components/UpComingGame';
import { API_URL } from '../config';
import { useLocation } from '../hooks/useLocation';
import { useUser } from '../hooks/useUser';

const PlayScreen = () => {
  const route = useRoute();
  const [sport, setSport] = useState('');
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const { token, userId, setUserId } = useContext(AuthContext);
  const [upcomingGames, setUpComingGames] = useState([]);
  const initialOption = route?.params?.initialOption || 'All';
  const [option, setOptions] = useState(initialOption);
  const uniqueSports = [...new Set(games.map(g => g.sport))].filter(Boolean);
  const { cityName, locationLoading } = useLocation();
  const { user, loading: userLoading } = useUser(userId);

  useEffect(() => {
    if (initialOption) {
      setOptions(initialOption);
    }
  }, [initialOption]);

  useEffect(() => {
    if (uniqueSports.length > 0 && !sport) {
      setSport(uniqueSports[0]);
    }
  }, [uniqueSports]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/games`);
      console.log('response ', response.data);

      setGames(response.data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
      // Handle error
    } 
  };

  useEffect(() => {
    if (userId) {
      fetchUpcomingGames();
    }
  }, [userId]);


  const fetchUpcomingGames = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/games/upcoming?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUpComingGames(response.data);
    } catch (error) {
      console.error('Failed to fetch upcoming games:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchGames();
      }
    }, [userId]),
  );

  // 1. All: Case insensitive check karein
  const allGamesBySport = games.filter(
    g => g.sport?.toLowerCase() === sport?.toLowerCase(),
  );

  // 2. My Sports: adminId ko string mein convert karke match karein
  const myCreatedGames = games.filter(
    g =>
      g.sport?.toLowerCase() === sport?.toLowerCase() &&
      g.adminId?.toString() === userId?.toString(),
  );

  // 3. Other Sports
  const otherPeopleGames = games.filter(
    g =>
      g.sport?.toLowerCase() === sport?.toLowerCase() &&
      g.adminId?.toString() !== userId?.toString(),
  );

  if ( userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#12e04c" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ padding: 12, backgroundColor: '#223536' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
              {locationLoading ? 'Loading...' : cityName}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={28} color="white" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="chatbox-outline" size={28} color="white" />
            <Ionicons name="notifications-outline" size={28} color="white" />

            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri:
                  user?.user?.image ||
                  'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 13,
          }}
        >
          <Pressable onPress={() => setOptions('All')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'All' ? '#12e04c' : 'white',
              }}
            >
              All
            </Text>
          </Pressable>
          <Pressable onPress={() => setOptions('Calendar')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'Calendar' ? '#12e04c' : 'white',
              }}
            >
              Calender
            </Text>
          </Pressable>
          <Pressable onPress={() => setOptions('My Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'My Sports' ? '#12e04c' : 'white',
              }}
            >
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOptions('Other Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'Other Sports' ? '#12e04c' : 'white',
              }}
            >
              Other Sports
            </Text>
          </Pressable>
        </View>

        {/* DYNAMIC SPORTS BUTTONS */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {uniqueSports.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSport(item)}
                style={{
                  borderColor: 'white',
                  marginRight: 10,
                  borderRadius: 8,
                  borderWidth: sport === item ? 0 : 1,
                  backgroundColor: sport === item ? '#1dbf22' : 'transparent',
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ color: 'white', fontWeight: '600', fontSize: 15 }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}

            {uniqueSports.length === 0 && (
              <Text style={{ color: 'gray', italic: 'italic' }}>
                No sports found
              </Text>
            )}
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'white',
        }}
      >
        <Pressable onPress={() => navigation.navigate('Create')}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Create Game</Text>
        </Pressable>
      </View>

      {/* ALL TAB */}
      {option === 'All' && (
        <FlatList
          data={allGamesBySport}
          renderItem={({ item }) => <Game item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {sport} games available</Text>
          }
        />
      )}

      {/* MY SPORTS TAB (Only My Created Games) */}
      {option === 'My Sports' && (
        <FlatList
          data={myCreatedGames}
          renderItem={({ item }) => <Game item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              You haven't created any {sport} games
            </Text>
          }
        />
      )}

      {/* OTHER SPORTS TAB (Games by others) */}
      {option === 'Other Sports' && (
        <FlatList
          data={otherPeopleGames}
          renderItem={({ item }) => <Game item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No games from others for {sport}
            </Text>
          }
        />
      )}

      {/* CALENDAR TAB */}
      {option === 'Calendar' && (
        <FlatList
          data={upcomingGames}
          renderItem={({ item }) => <UpComingGame item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No upcoming games</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});
