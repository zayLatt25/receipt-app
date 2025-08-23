import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import { scale, verticalScale, normalizeFont } from "../utils/sizes";

export const styles = StyleSheet.create({
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
  notificationButton: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginBottom: verticalScale(16),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationButtonText: {
    color: colors.white,
    fontSize: normalizeFont(16),
    fontFamily: fonts.main,
    fontWeight: "600",
  },
});
