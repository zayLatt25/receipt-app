import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { styles } from "../styles/styles";
import FormButton from "../components/FormButton";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setUserDataLoading(false);
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    setLogoutLoading(true);
    auth.signOut();
    setLogoutLoading(false);
  };

  if (userDataLoading) {
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
      <FormButton
        title="Logout"
        onPress={handleLogout}
        loading={logoutLoading}
      />
    </View>
  );
};

export default HomeScreen;
