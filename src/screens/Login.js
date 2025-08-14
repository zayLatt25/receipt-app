import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { authStyles } from "../styles/AuthScreenStyles";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import LinkText from "../components/LinkText";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Incorrect email or password.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter your password.";
          break;
      }

      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.centerContainer}>
      <Text style={authStyles.subtitle}>Hi, Welcome to</Text>
      <Text style={authStyles.title}>Receipt</Text>

      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormButton
        title="Login"
        onPress={handleLogin}
        loading={loading}
        style={authStyles.loginSignupButton}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <LinkText
          text="Don't have an account?"
          link="Sign Up"
          onPress={() => navigation.navigate("Signup")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
