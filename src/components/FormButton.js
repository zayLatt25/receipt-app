// components/FormButton.js
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "../styles/styles";

const FormButton = ({ title, onPress, loading = false, style }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={style}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;
