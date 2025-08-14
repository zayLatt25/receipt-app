import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import { scale, verticalScale, normalizeFont } from "../utils/sizes";

export const homeStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: verticalScale(20),
  },
  bodyText: {
    textAlign: "center",
    fontSize: normalizeFont(16),
    fontFamily: fonts.main,
    color: colors.lightCream,
    marginBottom: verticalScale(16),
  },
});
