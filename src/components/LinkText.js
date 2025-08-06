// components/LinkText.js
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

const LinkText = ({ text, link, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.linkText}>
      {text}
      <Text style={styles.linkTextHighlight}> {link}</Text>
    </Text>
  </TouchableOpacity>
);

export default LinkText;
