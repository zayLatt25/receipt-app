import React, { useState, useEffect } from "react";
import { View, Text, Switch, Alert, TouchableOpacity } from "react-native";
import styles from "../styles/ProfileScreenStyles";
import pushNotificationService from "../utils/pushNotifications";
import { calculateWeeklySpendingSummary, generateWeeklySummaryMessage } from "../utils/weeklySpendingSummary";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

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
        
        // Automatically schedule weekly spending summaries
        // Every Monday at 9:00 AM
        try {
          await pushNotificationService.scheduleWeeklySpendingSummary(
            'monday',  
            '09:00'   
          );
          
          Alert.alert(
            "Notifications Enabled",
            "You'll now receive push notifications and weekly spending summaries every Monday at 9:00 AM.",
            [{ text: "OK" }]
          );
        } catch (error) {
          console.error("Error scheduling weekly summary:", error);
          Alert.alert(
            "Notifications Enabled",
            "You'll now receive push notifications.",
            [{ text: "OK" }]
          );
        }
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

  // Handle weekly summary notification
  const handleWeeklySummaryNotification = async () => {
    if (!user) {
      Alert.alert("Error", "Please log in to view weekly summaries.");
      return;
    }

    if (!notificationsEnabled) {
      Alert.alert(
        "Notifications Disabled",
        "Please enable notifications first to view weekly summaries.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const summary = await calculateWeeklySpendingSummary(db, user.uid);
      const message = generateWeeklySummaryMessage(summary);
      
      await pushNotificationService.scheduleLocalNotification({
        title: "Weekly Spending Summary",
        body: message,
        data: { type: "weekly_summary" },
        trigger: null, // Show immediately
      });
    } catch (error) {
      console.error("Error showing weekly summary:", error);
      Alert.alert("Error", "Failed to generate weekly summary. Please try again.");
    }
  };

  return (
    <View style={styles.settingsContainer}>
      {/* Push Notifications Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Push Notifications</Text>
          <Text style={styles.settingDescription}>
            Receive weekly spending summaries every Monday at 9:00 AM
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
          trackColor={{ false: styles.switchTrackDisabled, true: styles.switchTrackEnabled }}
          thumbColor={notificationsEnabled ? styles.switchThumbEnabled : styles.switchThumbDisabled}
        />
      </View>

      {/* Change Password Section */}
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Change Password</Text>
          <Text style={styles.settingDescription}>
            Update your account password for security
          </Text>
        </View>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => setChangePasswordModalVisible(true)}
        >
          <Text style={styles.changePasswordButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly Summary Button */}
      {notificationsEnabled && (
        <TouchableOpacity
          style={styles.weeklySummaryButton}
          onPress={handleWeeklySummaryNotification}
        >
          <Text style={styles.weeklySummaryButtonText}>
            📊 View Weekly Spending Summary Now
          </Text>
        </TouchableOpacity>
      )}
      
      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
      />
    </View>
  );
}
