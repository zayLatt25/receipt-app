import { StyleSheet } from "react-native";
import { colors, metrics } from "./theme";

export const homeStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: metrics.scale(16),
    paddingTop: metrics.verticalScale(10),
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: metrics.verticalScale(10),
  },
  bodyText: {
    textAlign: "center",
    fontSize: metrics.moderateScale(16),
    color: colors.textSecondary,
    marginTop: metrics.verticalScale(20),
  },
});
