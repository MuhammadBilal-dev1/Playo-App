import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VenuCard from '../components/VenuCard';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config';
import { useLocation } from '../hooks/useLocation';
import { useUser } from '../hooks/useUser';

const BookScreen = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { token, userId, setUserId } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const { cityName, locationLoading } = useLocation();
  const {user, loading: userLoading} = useUser(userId)

  // Jab venues ka data API se aaye, tab filteredVenues ko bhi initialize kar dein
  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
  }, [token]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${API_URL}/venues`);
        setVenues(response.data);
        console.log('Fetched Venues:', response.data);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleSearch = text => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredVenues(venues);
      return;
    }

    const query = text.toLowerCase();
    const filtered = venues.filter(venue => {
      return (
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query)
      );
    });
    setFilteredVenues(filtered);
  };

  if (loading || userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#12e04c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.cityText}>
            {locationLoading ? 'Loading...' : cityName}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={28} color={'black'} />
        </View>

        <View style={styles.headerIcons}>
          <Ionicons name="chatbox-outline" size={28} color={'black'} />
          <Ionicons name="notifications-outline" size={28} color={'black'} />
          <Image
            style={styles.profileImg}
            source={{
              uri:
                user?.user?.image ||
                'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
            }}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search For Venues"
          style={{ fontSize: 17, flex: 1 }}
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={28} color={'gray'} />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['Sports & Availability', 'Favourites', 'Offers'].map(
          (filter, index) => (
            <Pressable key={index} style={styles.filterItem}>
              <Text style={{ fontSize: 15 }}>{filter}</Text>
            </Pressable>
          ),
        )}
      </View>

      {/* Venues List */}
      <FlatList
        data={filteredVenues}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <VenuCard
              item={item}
              onPress={() =>
                navigation.navigate('VenueDetails', { venue: item })
              }
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 45 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cityText: { fontSize: 17, fontWeight: '500' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileImg: { width: 30, height: 30, borderRadius: 15 },
  searchBar: {
    marginHorizontal: 12,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 13,
  },
  filterItem: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
});
