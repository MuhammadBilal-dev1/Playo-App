/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/*
bm154355
lamborghanni1
mongodb+srv://bm154355:lamborghanni1@cluster0.aylsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

*/

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthProvider} from './AuthContext';


function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
