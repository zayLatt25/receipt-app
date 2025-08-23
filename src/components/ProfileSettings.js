import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import pushNotificationService from "../utils/pushNotifications";

export default function ProfileSettings() {
  // Handle notification button press
  const handleNotificationPress = async () => {
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
    <View>
      
      {/* Notification Test Button */}
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={handleNotificationPress}
      >
        <Text style={styles.notificationButtonText}>🔔 Test Notification</Text>
      </TouchableOpacity>
      
      {/* TODO: Add more settings content here */}
    </View>
  );
}
