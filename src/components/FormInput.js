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
  returnKeyType,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={"#aaa"}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      value={value}
      onChangeText={onChangeText}
      returnKeyType={returnKeyType}
    />
  );
};

export default FormInput;
