// components/LinkText.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";
import { verticalScale, normalizeFont } from "../utils/sizes";

const LinkText = ({ text, link, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.linkText}>
      {text}
      <Text style={styles.linkTextHighlight}> {link}</Text>
    </Text>
  </TouchableOpacity>
);

export default LinkText;

const styles = StyleSheet.create({
  linkText: {
    marginTop: verticalScale(14),
    fontSize: normalizeFont(14),
    color: colors.lightCream,
    textAlign: "center",
  },
  linkTextHighlight: {
    color: colors.darkPink,
    fontWeight: "600",
  },
});
