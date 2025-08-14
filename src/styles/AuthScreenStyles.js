import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export const authStyles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    padding: scale(20),
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: normalizeFont(40),
    fontFamily: fonts.main,
    fontWeight: "bold",
    textAlign: "left",
    color: colors.lightCream,
    marginBottom: verticalScale(30),
  },
  subtitle: {
    fontSize: normalizeFont(30),
    textAlign: "center",
    color: colors.lightCream,
    fontFamily: fonts.main,
    marginBottom: verticalScale(16),
  },
  loginSignupButton: {
    backgroundColor: colors.lightCream,
    borderWidth: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginVertical: verticalScale(10),
    width: "100%",
  },
});
