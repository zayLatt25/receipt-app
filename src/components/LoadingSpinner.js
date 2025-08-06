// components/LoadingSpinner.js
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingSpinner = ({ size = "small", color = "#fff" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingSpinner;
