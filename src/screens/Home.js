import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { styles } from "../styles/styles";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.bodyText}>Logged in as: {userData?.email}</Text>
      <Text style={styles.bodyText}>Name: {userData?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
