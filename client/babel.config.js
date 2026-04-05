module.exports = function (api) {
 // Cache ko manual handle karne ke bajaye platform par depend karwao
  const isWeb = api.caller((caller) => caller && (caller.name === 'babel-loader' || caller.platform === 'web'));

  console.log('babel.config.js - Is this Web?', !!isWeb);

  return {
    presets: isWeb
      ? ['babel-preset-expo']
      : ['module:@react-native/babel-preset'],
  };
};
