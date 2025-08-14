// components/FormButton.js
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/theme";
import { normalizeFont } from "../utils/sizes";

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

const styles = StyleSheet.create({
  text: {
    color: colors.navyBlue,
    fontSize: normalizeFont(16),
    fontWeight: "bold",
    textAlign: "center",
  },
});
