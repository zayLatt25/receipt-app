// utils/connectivity.js
import NetInfo from '@react-native-community/netinfo';

/**
 * Internet connectivity utility functions
 * Provides methods to check and monitor internet connection status
 */

/**
 * Check if device is currently connected to the internet
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
export const isConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Error checking connectivity:', error);
    return false;
  }
};

/**
 * Get detailed connection information
 * @returns {Promise<Object>} Connection state object
 */
export const getConnectionInfo = async () => {
  try {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
      isEthernet: state.type === 'ethernet',
      isUnknown: state.type === 'unknown',
      isNone: state.type === 'none',
    };
  } catch (error) {
    console.error('Error getting connection info:', error);
    return {
      isConnected: false,
      isInternetReachable: false,
      type: 'unknown',
      isWifi: false,
      isCellular: false,
      isEthernet: false,
      isUnknown: true,
      isNone: false,
    };
  }
};

/**
 * Add a listener for connectivity changes
 * @param {Function} callback - Function to call when connectivity changes
 * @returns {Function} Unsubscribe function
 */
export const addConnectivityListener = (callback) => {
  return NetInfo.addEventListener(callback);
};

/**
 * Remove connectivity listener
 * @param {Function} unsubscribe - The unsubscribe function returned from addConnectivityListener
 */
export const removeConnectivityListener = (unsubscribe) => {
  if (unsubscribe && typeof unsubscribe === 'function') {
    unsubscribe();
  }
};

/**
 * Check connectivity with a timeout
 * @param {number} timeout - Timeout in milliseconds (default: 5000)
 * @returns {Promise<boolean>} True if connected within timeout, false otherwise
 */
export const isConnectedWithTimeout = async (timeout = 5000) => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(false);
    }, timeout);

    isConnected().then((connected) => {
      clearTimeout(timeoutId);
      resolve(connected);
    }).catch(() => {
      clearTimeout(timeoutId);
      resolve(false);
    });
  });
};

/**
 * Utility to show connectivity status message
 * @param {boolean} isConnected - Connection status
 * @returns {string} User-friendly status message
 */
export const getConnectivityMessage = (isConnected) => {
  if (isConnected) {
    return 'Connected to internet';
  }
  return 'No internet connection';
};

/**
 * Check if connection is stable (connected for minimum duration)
 * @param {number} minDuration - Minimum duration in milliseconds (default: 2000)
 * @returns {Promise<boolean>} True if connection is stable
 */
export const isConnectionStable = async (minDuration = 2000) => {
  const initialCheck = await isConnected();
  if (!initialCheck) return false;

  return new Promise((resolve) => {
    setTimeout(async () => {
      const currentCheck = await isConnected();
      resolve(currentCheck);
    }, minDuration);
  });
};
