import { StyleSheet } from "react-native";
import { colors, metrics } from "./theme";

export const authStyles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: metrics.scale(20),
    backgroundColor: colors.background,
  },
  title: {
    fontSize: metrics.moderateScale(32),
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: metrics.verticalScale(10),
  },
  subtitle: {
    fontSize: metrics.moderateScale(18),
    color: colors.textSecondary,
    marginBottom: metrics.verticalScale(15),
  },
  loginSignupButton: {
    width: "100%",
    marginTop: metrics.verticalScale(10),
    backgroundColor: colors.primary,
  },
});
