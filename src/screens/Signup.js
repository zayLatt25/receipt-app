// screens/SignupScreen.js
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { styles } from "../styles/styles";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import LinkText from "../components/LinkText";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return Alert.alert("Password Mismatch", "Passwords do not match.");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        case "auth/missing-password":
          errorMessage = "Password is required.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again.";
      }

      Alert.alert("Signup Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 32, marginBottom: 20 }]}>
        Sign Up
      </Text>

      {/* Name input */}
      <FormInput placeholder="Full Name" value={name} onChangeText={setName} />
      {/* Email input */}
      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {/* Password inputs */}
      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <FormInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <FormButton title="Sign Up" onPress={handleSignup} loading={loading} />

      <LinkText
        text="Already have an account?"
        link="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;
