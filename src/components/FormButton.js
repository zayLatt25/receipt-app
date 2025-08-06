// components/FormButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";

const FormButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default FormButton;
