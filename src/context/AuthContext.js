// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      return { success: true, message: "Password changed successfully!" };
    } catch (error) {
      console.error("Error changing password:", error);
      let message = "Failed to change password. Please try again.";
      
      if (error.code === "wrong-password") {
        message = "Current password is incorrect.";
      } else if (error.code === "weak-password") {
        message = "New password is too weak. Please choose a stronger password.";
      } else if (error.code === "requires-recent-login") {
        message = "Please log in again before changing your password.";
      }
      
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
