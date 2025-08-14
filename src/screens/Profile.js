// src/screens/Profile.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import FormButton from "../components/FormButton";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { user } = useAuth();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
    } finally {
      setLogoutLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      // make sure user exists
      if (!user || !user.uid) return;

      // users collection
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setProfileData(profileData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        {profileData ? (
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>Name: {profileData.name}</Text>
            <Text style={styles.profileText}>Email: {profileData.email}</Text>
          </View>
        ) : (
          <Text style={styles.profileText}>Error Fetching User</Text>
        )}
        <FormButton
          title="Logout"
          onPress={handleLogout}
          loading={logoutLoading}
        />
      </View>
    </SafeAreaView>
  );
}
