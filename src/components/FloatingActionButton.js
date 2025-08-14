// components/FloatingActionButton.js
import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/FloatingActionButtonStyles";
import { colors } from "../styles/theme";

const FloatingActionButton = ({ onPress }) => {
  // for fade+scale in
  const scaleAnim = useRef(new Animated.Value(0)).current;
  // for press feedback
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.fabContainer,
        { transform: [{ scale: Animated.multiply(scaleAnim, pressAnim) }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          Animated.spring(pressAnim, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(pressAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }).start();
          onPress && onPress();
        }}
        style={styles.fabButton}
      >
        <Ionicons name="add" size={32} color={colors.navyBlue} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingActionButton;
