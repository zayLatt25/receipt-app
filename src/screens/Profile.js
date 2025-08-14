// src/screens/Profile.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import FormButton from "../components/FormButton";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TouchableOpacity } from "react-native";
import ProfileStats from "../components/ProfileStats";
import ProfileSettings from "../components/ProfileSettings";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("stats");
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileInfoContainer}>
          <Text style={styles.title}>Profile</Text>
          {profileData ? (
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Name: {profileData.name}</Text>
              <Text style={styles.profileText}>Email: {profileData.email}</Text>
            </View>
          ) : (
            <Text style={styles.profileText}>Error Fetching User</Text>
          )}
        </View>

        <FormButton
          title="Logout"
          onPress={handleLogout}
          loading={logoutLoading}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />

        {/* Pill Tabs */}
        <View style={styles.tabBarContainer}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tabPill,
                selectedTab === "stats" && styles.tabPillActive,
                selectedTab === "stats" && styles.tabPillLeftActive,
              ]}
              onPress={() => setSelectedTab("stats")}
            >
              <Text
                style={[
                  styles.tabPillText,
                  selectedTab === "stats" && styles.tabPillTextActive,
                ]}
              >
                Stats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabPill,
                selectedTab === "settings" && styles.tabPillActive,
                selectedTab === "settings" && styles.tabPillRightActive,
              ]}
              onPress={() => setSelectedTab("settings")}
            >
              <Text
                style={[
                  styles.tabPillText,
                  selectedTab === "settings" && styles.tabPillTextActive,
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === "stats" && <ProfileStats />}
          {selectedTab === "settings" && <ProfileSettings />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
