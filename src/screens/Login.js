// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { styles } from "../styles/styles";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import LinkText from "../components/LinkText";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
          errorMessage = "Incorrect email or password.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect email or password.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter your password.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again.";
      }

      Alert.alert("Login Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 30, color: "#333" }]}>
        Welcome to
      </Text>
      <Text
        style={[
          styles.title,
          { fontSize: 36, color: "#1e90ff", marginBottom: 32 },
        ]}
      >
        Receipt
      </Text>

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

      <FormButton title="Login" onPress={handleLogin} />

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
