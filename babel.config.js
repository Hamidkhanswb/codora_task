

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],  // if u want to use for various stages then go to react-native-dotenv for help
    'react-native-reanimated/plugin',

  ]
};
