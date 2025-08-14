import { StyleSheet } from "react-native";
import { colors, metrics } from "./theme";

export default StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: metrics.scale(20),
    backgroundColor: colors.background,
  },
  title: {
    fontSize: metrics.moderateScale(24),
    fontWeight: "bold",
    marginBottom: metrics.verticalScale(20),
    color: colors.textPrimary,
  },
  loginSignupButton: {
    marginTop: metrics.verticalScale(10),
    width: "100%",
  },
});
