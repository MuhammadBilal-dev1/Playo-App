import Geocoder from 'react-native-geocoder-reborn';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [cityName, setCityName] = useState('Loading...');
  const [locationLoading, setLocationLoading] = useState(true);

  const getLocation = async () => {
    try {
      if (Platform.OS === 'web') return true;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setCityName('Unknown');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const COORDS = { lat: latitude, lng: longitude };

          Geocoder.geocodePosition(COORDS)
            .then(res => {
              if (res && res.length > 0) {
                const city =
                  res[0].locality || res[0].subLocality || res[0].adminArea;
                setCityName(city || 'Unknown');
              }
            })
            .catch(err => {
              console.log('Geocoder Error:', err);
              setCityName('Unknown');
            })
            .finally(() => setLocationLoading(false));
        },
        error => {
          console.log('Location Error', error.code, error.message);
          setCityName('Unknown');
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (err) {
      console.warn(err);
      setCityName('Unknown');
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { cityName, locationLoading, refreshLocation: getLocation };
};
