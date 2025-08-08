// src/screens/Profile.js
import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import FormButton from "../components/FormButton";
import { auth } from "../firebase";

export default function ProfileScreen() {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    auth.signOut();
    setLogoutLoading(false);
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Profile Screen</Text>

      <FormButton
        title="Logout"
        onPress={handleLogout}
        loading={logoutLoading}
      />
    </View>
  );
}
