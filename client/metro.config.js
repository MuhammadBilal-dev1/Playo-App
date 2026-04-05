const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
const path = require('path');

// Ye detection logic zyada strong hai
const isWeb =
  process.argv.some(arg => arg.includes('web')) ||
  process.env.npm_lifecycle_event?.includes('web') ||
  process.env.EXPO_PUBLIC_PLATFORM === 'web';

console.log('metro.config.js isWeb', isWeb);

const config = {
  resolver: {
    // Agar web hai to web extensions pehle, warna normal default list
    sourceExts: isWeb
      ? ['web.js', 'web.ts', 'web.tsx', ...defaultConfig.resolver.sourceExts]
      : defaultConfig.resolver.sourceExts,

    // YE LINE ERROR KHATAM KAREGI:
    alias: isWeb
      ? {
          'react-native-maps': path.resolve(
            __dirname,
            'react-native-maps.web.js',
          ),
        }
      : {},
  },
};

module.exports = mergeConfig(defaultConfig, config);
