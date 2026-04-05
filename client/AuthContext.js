import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [upcomingGames, setUpcomingGames] = useState([]); // Initialize as array

  // 1. Initial Load: Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        
        // SAFE CHECK: Token hona chahiye, null nahi hona chahiye, aur "undefined" string nahi honi chahiye
        if (storedToken && storedToken !== "undefined" && storedToken !== null) {
          setToken(storedToken);
          const decodedToken = jwtDecode(storedToken);
          if(decodedToken && decodedToken.userId) {
             setUserId(decodedToken.userId);
          }
        } else {
          setToken(null); // Agar kachra mile to token clear kar do
        }
      } catch (error) {
        console.log('Error in initial load:', error);
        setToken(null);
      }
    };
    checkLoginStatus();
  }, []);

  // 2. Token update hone par userId set karein
  useEffect(() => {
    // Yahan bhi check lagana zaroori hai
    if (token && token !== "undefined" && token !== null) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
            setUserId(decodedToken.userId);
            AsyncStorage.setItem('userId', decodedToken.userId);
        }
      } catch (e) {
        console.log("Token decode error:", e);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        upcomingGames,
        setUpcomingGames,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};