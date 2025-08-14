import { StyleSheet } from "react-native";
import { colors, fonts, metrics } from "./theme";

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
    marginBottom: metrics.verticalScale(20),
  },
  bodyText: {
    textAlign: "center",
    fontSize: metrics.normalizeFont(16),
    fontFamily: fonts.main,
    color: colors.lightCream,
    marginBottom: metrics.verticalScale(16),
  },
});
