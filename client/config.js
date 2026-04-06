import { Platform } from 'react-native';

const BASE_URL =
  Platform.OS === 'web'
    ? process.env.NODE_ENV === 'production'
      ? '' // ISAY KHALI RAKHO
      : 'http://localhost:8000'
    : 'http://10.0.2.2:8000';

export const API_URL = `${BASE_URL}/api`;