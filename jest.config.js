// jest.config.js
module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^react-native$": "react-native",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|expo" +
      "|expo-modules-core" +
      "|expo-asset" +
      "|expo-constants" +
      "|expo-file-system" +
      "|expo-font" +
      "|expo-image-picker" +
      "|expo-image-manipulator" +
      "|firebase" +
      "|@firebase" +
      ")/)",
  ],
};
