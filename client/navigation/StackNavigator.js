import { Platform } from 'react-native';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PlayScreen from '../screens/PlayScreen.js';
import BookScreen from '../screens/BookScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import VenueInfoScreen from '../screens/VenueInfoScreen.js';
import StartScreen from '../screens/StartScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import PasswordScreen from '../screens/PasswordScreen.js';
import NameScreen from '../screens/NameScreen.js';
import SelectImage from '../screens/SelectImage.js';
import PreFinalScreen from '../screens/PreFinalScreen.js';
import { AuthContext } from '../AuthContext.js';
import CreateActivity from '../screens/CreateActivity.js';
import TagVenueScreen from '../screens/TagVenueScreen.js';
import SelectTimeScreen from '../screens/SelectTimeScreen.js';
import GameSetUpScreen from '../screens/GameSetUpScreen.js';
import ManageRequestScreen from '../screens/ManageRequestScreen.js';
import SlotScreen from '../screens/SlotScreen.js';
import PaymentScreen from '../screens/PaymentScreen.js';
import PlayersScreen from '../screens/PlayersScreen.js';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const { token } = useContext(AuthContext);

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: 'green',
            // headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home-outline" size={28} color="green" />
              ) : (
                <Ionicons name="home-outline" size={28} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="PLAY"
          component={PlayScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              const iconName =
                Platform.OS === 'web' ? 'usergroup-add' : 'addusergroup';
              return focused ? (
                <AntDesign name={iconName} size={28} color="green" />
              ) : (
                <AntDesign name={iconName} size={28} color="#989898" />
              );
            },
          }}
        />
        <Tab.Screen
          name="BOOK"
          component={BookScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <SimpleLineIcons name="book-open" size={28} color="green" />
              ) : (
                <SimpleLineIcons name="book-open" size={28} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="PROFILE"
          component={ProfileScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-outline" size={28} color="green" />
              ) : (
                <Ionicons name="person-outline" size={28} color="#989898" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Image"
          component={SelectImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  function MainStack(params) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Venue"
          component={VenueInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create"
          component={CreateActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Time" component={SelectTimeScreen} />
        <Stack.Screen
          name="TagVenue"
          component={TagVenueScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameSetUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Manage"
          component={ManageRequestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Slot"
          component={SlotScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Players"
          component={PlayersScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {!token ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;
