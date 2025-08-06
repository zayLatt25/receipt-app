// components/LinkText.js
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LinkText = ({ text, link, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
      {text}
      <Text style={{ color: "#1e90ff", fontWeight: "600" }}> {link}</Text>
    </Text>
  </TouchableOpacity>
);

export default LinkText;
