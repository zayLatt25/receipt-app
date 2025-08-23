import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { styles } from "../styles/styles";
import pushNotificationService from "../utils/pushNotifications";

export default function ProfileSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Check current notification permission status on component mount
  useEffect(() => {
    checkNotificationStatus();
  }, []);

  // Check if notifications are currently enabled
  const checkNotificationStatus = async () => {
    try {
      const status = await pushNotificationService.getNotificationPermissionsStatus();
      setNotificationsEnabled(status === 'granted');
    } catch (error) {
      console.error("Error checking notification status:", error);
    }
  };

  // Handle notification toggle
  const handleNotificationToggle = async (value) => {
    if (value) {
      // User wants to enable notifications
      const hasPermissions = await pushNotificationService.requestPermissions();
      if (hasPermissions) {
        setNotificationsEnabled(true);
        Alert.alert(
          "Notifications Enabled",
          "You'll now receive push notifications from the app.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "To receive notifications, please enable them in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => pushNotificationService.openSettings() }
          ]
        );
      }
    } else {
      // User wants to disable notifications
      Alert.alert(
        "Disable Notifications",
        "Are you sure you want to disable push notifications?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Disable", 
            style: "destructive",
            onPress: () => {
              setNotificationsEnabled(false);
              Alert.alert("Notifications Disabled", "You won't receive push notifications anymore.");
            }
          }
        ]
      );
    }
  };

  // Handle notification button press
  const handleNotificationPress = async () => {
    if (!notificationsEnabled) {
      Alert.alert(
        "Notifications Disabled",
        "Please enable notifications first to test them.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await pushNotificationService.scheduleLocalNotification({
        title: "Hi there! 👋",
        body: "This is a test notification from your receipt app!",
        data: { type: "test" },
        trigger: null, // Show immediately
      });
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  };

  return (
    <View style={styles.settingsContainer}>
      {/* Push Notifications Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Push Notifications</Text>
          <Text style={styles.settingDescription}>
            Receive reminders and updates about your expenses
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
          trackColor={{ false: styles.switchTrackDisabled, true: styles.switchTrackEnabled }}
          thumbColor={notificationsEnabled ? styles.switchThumbEnabled : styles.switchThumbDisabled}
        />
      </View>

      {/* Notification Test Button */}
      <TouchableOpacity
        style={[
          styles.notificationButton,
          !notificationsEnabled && styles.notificationButtonDisabled
        ]}
        onPress={handleNotificationPress}
        disabled={!notificationsEnabled}
      >
        <Text style={[
          styles.notificationButtonText,
          !notificationsEnabled && styles.notificationButtonTextDisabled
        ]}>
          🔔 Test Notification
        </Text>
      </TouchableOpacity>
      
      {/* TODO: Add more settings content here */}
    </View>
  );
}
