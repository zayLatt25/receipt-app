// src/screens/Profile.js
import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import FormButton from "../components/FormButton";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <FormButton
          title="Logout"
          onPress={handleLogout}
          loading={logoutLoading}
        />
      </View>
    </SafeAreaView>
  );
}
