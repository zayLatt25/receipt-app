import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../components/SplashScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
