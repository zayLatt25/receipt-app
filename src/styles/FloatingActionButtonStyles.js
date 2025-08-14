// FloatingActionButtonStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./theme";
import { scale, verticalScale, moderateScale } from "../utils/sizes";

export const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: verticalScale(30),
    right: scale(30),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabButton: {
    backgroundColor: colors.lightCream,
    borderRadius: moderateScale(30),
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
  },
});
