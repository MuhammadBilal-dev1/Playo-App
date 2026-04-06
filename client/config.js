import { Platform } from 'react-native';

const PRODUCTION_URL = 'https://your-app-name.vercel.app';

// const BASE_URL = Platform.OS === 'web'
//     ? 'http://localhost:8000'
//     : 'http://10.0.2.2:8000';

// export const API_URL = `${BASE_URL}/api`;

const BASE_URL =
  Platform.OS === 'web'
    ? process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:8000'
    : 'http://10.0.2.2:8000';

export const API_URL = Platform.OS === 'web' ? `${BASE_URL}/api` : `${BASE_URL}/api`;
