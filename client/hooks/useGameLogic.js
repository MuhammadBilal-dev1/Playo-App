import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import { AuthContext } from '../AuthContext';
import { API_URL } from '../config';
import { useNavigation } from '@react-navigation/native';

export const useGameLogic = (gameId, initialGameData) => {
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [matchFull, setMatchFull] = useState(
    initialGameData?.matchFull || false,
  );
  const [requests, setRequests] = useState([]);
  const [players, setPlayers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isQueryModalVisible, setQueryModalVisible] = useState(false);
  const [queries, setQueries] = useState([]);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, [token]);

  useEffect(() => {
    fetchVenues();
    if (gameId) {
      fetchPlayers();
      fetchRequests();
      fetchQueries();
    }
  }, [gameId]);

  const clearGameData = async () => {
    await AsyncStorage.removeItem('timeInterval');
    await AsyncStorage.removeItem('selectedVenue');
    await AsyncStorage.removeItem('date');
  };

  const createGame = async gamePayload => {
    const { sport, taggedVenue, date, timeInterval, noOfPlayers } = gamePayload;

    // Basic Validation
    if (!sport || !taggedVenue || !date || !timeInterval) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const gameData = {
        sport,
        area: taggedVenue,
        date,
        time: timeInterval,
        admin: userId,
        totalPlayers: noOfPlayers,
      };

      const response = await axios.post(
        `${API_URL}/games/creategame`,
        gameData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        Alert.alert('Success!', 'Game created Successfully', [
          {
            text: 'OK',
            onPress: () => {
              clearGameData();
              navigation.navigate('Main', { screen: 'PLAY' });
            },
          },
        ]);
        return true; // Success indicate karne ke liye
      }
    } catch (error) {
      console.error('Failed to create game:', error);
      Alert.alert('Error', 'Failed to create game. Please try again.');
    } finally {
      setLoading(false);
    }
    return false;
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/games/${gameId}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${API_URL}/games/${gameId}/players`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlayers(response.data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  const acceptRequest = async userId => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/games/accept`, {
        gameId: gameId,
        userId: userId,
      });

      if (response.status === 200) {
        // Data refresh karo taake UI update ho jaye
        await Promise.all([fetchRequests(), fetchPlayers()]);
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to accept request:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${API_URL}/venues`);
      setVenues(response.data);
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    }
  };

  const sendJoinRequest = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/games/${gameId}/request`,
        { userId: currentUserId, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        Alert.alert('Request Sent', 'please wait for the host to accept!');
        setModalVisible(false);
        fetchRequests(); // Refresh requests list
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const toggleMatchFullStatus = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/games/toggle-match-full`,
        { gameId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 200) {
        Alert.alert('Success', `Match full status updated`);
        setMatchFull(!matchFull);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSendQuery = async queryText => {
    try {
      const response = await axios.post(
        `${API_URL}/games/send-query`,
        { gameId, senderId: currentUserId, message: queryText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setQueryModalVisible(false);
        fetchQueries(); // Refresh queries
        Alert.alert('Query sent successfully!');
      }
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${API_URL}/games/${gameId}/queries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(response.data);
    } catch (error) {
      console.log('Failed to fetch queries:', error);
    }
  };

  const handleReplyQuery = async (queryId, text) => {
    try {
      const response = await axios.put(`${API_URL}/games/reply-query`, {
        queryId,
        reply: text,
      });
      if (response.status === 200 && response.data.success) {
        fetchQueries();
        setIsReplyModalVisible(false);
        setReplyText('');
        alert('Reply sent successfully!');
      }
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  return {
    currentUserId,
    setCurrentUserId,
    modalVisible,
    setModalVisible,
    comment,
    setComment,
    matchFull,
    requests,
    players,
    venues,
    isQueryModalVisible,
    setQueryModalVisible,
    acceptRequest,
    queries,
    isReplyModalVisible,
    setIsReplyModalVisible,
    selectedQuery,
    setSelectedQuery,
    replyText,
    setReplyText,
    sendJoinRequest,
    toggleMatchFullStatus,
    handleSendQuery,
    handleReplyQuery,
    createGame,
    loading
  };
};
