import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AppNavigator from "./src/components/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
