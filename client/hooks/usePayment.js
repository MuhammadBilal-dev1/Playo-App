import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigation } from '@react-navigation/native';

export const usePayment = bookingData => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const bookSlot = async () => {
    if (loading) return; // Bar bar click hone se bachaye ga

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/venues/book`, {
        courtNumber: Array.isArray(bookingData.selectedCourt)
          ? String(bookingData.selectedCourt[0])
          : String(bookingData.selectedCourt),
        date: bookingData.selectedDate,
        time: bookingData.selectedTime,
        userId: bookingData.userId,
        name: bookingData.place,
        game: bookingData.gameId,
      });

      if (response.status === 200) {
        console.log('Booking successful:', response.data);
        navigation.replace('Main');
      }
    } catch (error) {
      console.error(
        'Error booking slot:',
        error?.response?.data || error.message,
      );
      alert('Booking fail ho gayi hai, dobara koshish karein.');
    } finally {
      setLoading(false);
    }
  };

  return { bookSlot, loading };
};
