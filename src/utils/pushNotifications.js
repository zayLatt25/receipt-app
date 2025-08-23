import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class PushNotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }

  /**
   * Request notification permissions
   * @returns {Promise<boolean>} Whether permissions were granted
   */
  async requestPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        return false;
      }
      
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get the Expo push token
   * @returns {Promise<string|null>} The push token or null if not available
   */
  async getExpoPushToken() {
    try {
      const hasPermissions = await this.requestPermissions();
      if (!hasPermissions) return null;

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: '@mac255/receipt', 
      });
      
      this.expoPushToken = token.data;
      return this.expoPushToken;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  /**
   * Schedule a local notification
   * @param {Object} options - Notification options
   * @param {string} options.title - Notification title
   * @param {string} options.body - Notification body
   * @param {Object} options.data - Additional data to pass
   * @param {Date|number} options.trigger - When to show the notification
   * @returns {Promise<string>} The notification identifier
   */
  async scheduleLocalNotification({ title, body, data = {}, trigger }) {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
        },
        trigger,
      });
      
      return identifier;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  }

  /**
   * Schedule a notification for a specific date and time
   * @param {Object} options - Notification options
   * @param {string} options.title - Notification title
   * @param {string} options.body - Notification body
   * @param {Date} options.date - When to show the notification
   * @param {Object} options.data - Additional data to pass
   * @returns {Promise<string>} The notification identifier
   */
  async scheduleNotificationAtDate({ title, body, date, data = {} }) {
    return this.scheduleLocalNotification({
      title,
      body,
      data,
      trigger: { date },
    });
  }

  /**
   * Schedule a recurring notification
   * @param {Object} options - Notification options
   * @param {string} options.title - Notification title
   * @param {string} options.body - Notification body
   * @param {Object} options.repeat - Repeat configuration
   * @param {Object} options.data - Additional data to pass
   * @returns {Promise<string>} The notification identifier
   */
  async scheduleRecurringNotification({ title, body, repeat, data = {} }) {
    return this.scheduleLocalNotification({
      title,
      body,
      data,
      trigger: { ...repeat },
    });
  }

  /**
   * Cancel a scheduled notification
   * @param {string} identifier - The notification identifier
   */
  async cancelNotification(identifier) {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  /**
   * Get all scheduled notifications
   * @returns {Promise<Array>} Array of scheduled notifications
   */
  async getScheduledNotifications() {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Set up notification listeners
   * @param {Function} onNotificationReceived - Callback for received notifications
   * @param {Function} onNotificationResponse - Callback for notification responses
   */
  setupNotificationListeners(onNotificationReceived, onNotificationResponse) {
    // Listen for notifications received while app is foregrounded
    this.notificationListener = Notifications.addNotificationReceivedListener(
      onNotificationReceived
    );

    // Listen for user interaction with notifications
    this.responseListener = Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );
  }

  /**
   * Remove notification listeners
   */
  removeNotificationListeners() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
      this.notificationListener = null;
    }
    
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
      this.responseListener = null;
    }
  }

  /**
   * Get the current notification permissions status
   * @returns {Promise<string>} The current permission status
   */
  async getNotificationPermissionsStatus() {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Error getting notification permissions:', error);
      return 'undetermined';
    }
  }

  /**
   * Check if notifications are enabled
   * @returns {Promise<boolean>} Whether notifications are enabled
   */
  async areNotificationsEnabled() {
    const status = await this.getNotificationPermissionsStatus();
    return status === 'granted';
  }

  /**
   * Get the current badge count
   * @returns {Promise<number>} The current badge count
   */
  async getBadgeCount() {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error('Error getting badge count:', error);
      return 0;
    }
  }

  /**
   * Set the badge count
   * @param {number} count - The badge count to set
   */
  async setBadgeCount(count) {
    try {
      await Notifications.setBadgeCountAsync(count);
    } catch (error) {
      console.error('Error setting badge count:', error);
    }
  }

  /**
   * Clear the badge count
   */
  async clearBadgeCount() {
    await this.setBadgeCount(0);
  }

  /**
   * Open device settings (iOS) or app settings (Android)
   */
  async openSettings() {
    try {
      await Notifications.openSettingsAsync();
    } catch (error) {
      console.error("Error opening settings:", error);
    }
  }

  /**
   * Schedule weekly spending summary notification
   * @param {string} dayOfWeek - Day of week to send notification (e.g., 'monday', 'sunday')
   * @param {string} time - Time to send notification (e.g., '09:00')
   * @returns {Promise<string>} The notification identifier
   */
  async scheduleWeeklySpendingSummary(dayOfWeek = 'monday', time = '09:00') {
    try {
      const [hours, minutes] = time.split(':').map(Number);
      
      const trigger = {
        hour: hours,
        minute: minutes,
        weekday: this.getWeekdayNumber(dayOfWeek),
        repeats: true,
      };

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Weekly Spending Summary",
          body: "Check out your spending insights for this week!",
          data: { type: "weekly_summary" },
          sound: true,
        },
        trigger,
      });

      return identifier;
    } catch (error) {
      console.error("Error scheduling weekly spending summary:", error);
      throw error;
    }
  }

  /**
   * Cancel weekly spending summary notification
   * @param {string} identifier - The notification identifier
   */
  async cancelWeeklySpendingSummary(identifier) {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      console.error("Error canceling weekly spending summary:", error);
    }
  }

  /**
   * Get weekday number for notification trigger
   * @param {string} dayOfWeek - Day name (e.g., 'monday', 'sunday')
   * @returns {number} Weekday number (1-7, where 1 is Sunday)
   */
  getWeekdayNumber(dayOfWeek) {
    const weekdays = {
      'sunday': 1,
      'monday': 2,
      'tuesday': 3,
      'wednesday': 4,
      'thursday': 5,
      'friday': 6,
      'saturday': 7,
    };
    return weekdays[dayOfWeek.toLowerCase()] || 1;
  }
}

// Create and export a singleton instance
const pushNotificationService = new PushNotificationService();

export default pushNotificationService;

// Export the class for testing or custom instances
export { PushNotificationService };
