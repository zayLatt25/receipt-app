// src/styles/CameraStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./theme";
import { verticalScale, moderateScale, normalizeFont } from "../utils/sizes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: colors.lightCream,
    borderWidth: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginVertical: verticalScale(10),
    width: "90%",
  },
  buttonText: {
    color: colors.navyBlue,
    fontSize: normalizeFont(16),
    fontFamily: "bold",
  },
});
