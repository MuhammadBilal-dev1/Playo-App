import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; // Aapki config file ka path

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]); 

  return { user, loading, error, refetchUser: fetchUser };
};