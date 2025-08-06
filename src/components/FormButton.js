// components/FormButton.js
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "../styles/styles";

const FormButton = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;
