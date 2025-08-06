import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import { styles } from "../styles/styles";

const HomeScreen = () => {
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Logged in as: {user?.displayName}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
