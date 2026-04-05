import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

let MapView, Marker, PROVIDER_GOOGLE;
if (Platform.OS !== 'web') {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

const StartScreen = () => {
  const mapView = useRef(null);
  const users = [
    {
      image:
        'https://images.pexels.com/photos/7208625/pexels-photo-7208625.jpeg',
      id: '1',
      latitude: 37.7849, // Nearby San Francisco
      longitude: -122.4094,
      name: 'sujan',
      description: 'Hey!',
    },
    {
      image:
        'https://images.pexels.com/photos/2913125/pexels-photo-2913125.jpeg',
      id: '2',
      latitude: 37.7649,
      longitude: -122.4294,
      name: 'suhas',
      description: "let's play",
    },
    {
      image:
        'https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg',
      id: '3',
      latitude: 37.7549,
      longitude: -122.4194,
      name: 'ashish',
      description: "I'm always",
    },
    {
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '1',
      latitude: 37.7793,
      longitude: -122.4193,
      name: 'Alex',
      description: 'Game time!',
    },
    {
      image:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '2',
      latitude: 37.7825,
      longitude: -122.4121,
      name: 'Sam',
      description: "Let's meet up!",
    },
    {
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '3',
      latitude: 37.7769,
      longitude: -122.4258,
      name: 'Jordan',
      description: "Who's in?",
    },
    {
      image:
        'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '4',
      latitude: 37.7705,
      longitude: -122.4156,
      name: 'Riley',
      description: 'Excited!',
    },
    {
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '5',
      latitude: 37.7781,
      longitude: -122.4295,
      name: 'Taylor',
      description: 'Hey everyone!',
    },
    {
      image:
        'https://images.pexels.com/photos/1191533/pexels-photo-1191533.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '6',
      latitude: 37.7732,
      longitude: -122.4108,
      name: 'Chris',
      description: 'Let’s play!',
    },
    // Add more users as needed...
  ];
  const navigation = useNavigation();

  const SANFRANCISCO_COORDS = {
    latitude: 37.7749, // San Francisco Latitude
    longitude: -122.4194, // San Francisco Longitude
  };

  const generateCircularPoints = (center, radius, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude = center.latitude + (radius / 111) * Math.cos(angle);
      const longitude =
        center.longitude +
        (radius / (111 * Math.cos(center.latitude))) * Math.sin(angle);
      points.push({ latitude, longitude });
    }

    return points;
  };

  const numPoints = 6;
  const radius = 5;
  const circularPoints = generateCircularPoints(
    SANFRANCISCO_COORDS,
    radius,
    numPoints,
  );

  useEffect(() => {
    if (Platform.OS !== 'web' && mapView.current) {
      mapView.current.fitToCoordinates(circularPoints, {
        edgePadding: {
          top: 70,
          bottom: 70,
          left: 70,
          right: 70,
        },
      });
    }
  }, []);

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}
      >
        <StatusBar barStyle={'dark-content'} />

        {Platform.OS === 'web' ? (
          <View
            style={{
              width: '100%',
              height: 480, 
              backgroundColor: '#f0f0f0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Maps are not available on Web version yet</Text>
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapView}
            style={{ width: '100%', height: 480 }}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {circularPoints?.map((point, index) => {
              const user = users[index % users.length];
              return (
                <Marker key={index} coordinate={point}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={{ uri: user?.image }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 25,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </Marker>
              );
            })}
          </MapView>
        )}

        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: '500',
              width: '75%',
              textAlign: 'center',
            }}
          >
            Find Player in Your neighbourhood
          </Text>

          <Text style={{ marginTop: 20, color: 'gray', fontSize: 20 }}>
            Just like you did as a Kid!
          </Text>
        </View>

        <Pressable
          style={{
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'gray', fontSize: 20 }}>
            Already have an account? Login
          </Text>
        </Pressable>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 160, height: 80, resizeMode: 'contain' }}
            source={{
              uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
            }}
          />
        </View>
      </SafeAreaView>

      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          marginTop: 'auto',
        }}
      >
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{
            marginTop: 'auto',
            backgroundColor: '#1ec921',
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: '400',
            }}
          >
            READY, SET, GO
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default StartScreen;
