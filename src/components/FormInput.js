// components/FormInput.js
import React from "react";
import { TextInput } from "react-native";
import { styles } from "../styles/styles";

const FormInput = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default FormInput;
