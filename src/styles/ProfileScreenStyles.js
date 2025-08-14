import { StyleSheet } from "react-native";
import { colors, metrics } from "./theme";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    padding: metrics.scale(20),
  },
  profileInfoContainer: {
    marginBottom: metrics.verticalScale(20),
  },
  title: {
    fontSize: metrics.moderateScale(24),
    fontWeight: "bold",
    marginBottom: metrics.verticalScale(10),
    color: colors.textPrimary,
  },
  profileInfo: {
    backgroundColor: colors.cardBackground,
    padding: metrics.scale(15),
    borderRadius: metrics.moderateScale(10),
  },
  profileText: {
    fontSize: metrics.moderateScale(16),
    color: colors.textSecondary,
    marginBottom: metrics.verticalScale(5),
  },
  logoutButton: {
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(20),
    backgroundColor: colors.error,
  },
  logoutButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  tabBarContainer: {
    marginBottom: metrics.verticalScale(15),
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderRadius: metrics.moderateScale(25),
    overflow: "hidden",
  },
  tabPill: {
    flex: 1,
    paddingVertical: metrics.verticalScale(8),
    alignItems: "center",
  },
  tabPillActive: {
    backgroundColor: colors.primary,
  },
  tabPillLeftActive: {
    borderTopLeftRadius: metrics.moderateScale(25),
    borderBottomLeftRadius: metrics.moderateScale(25),
  },
  tabPillRightActive: {
    borderTopRightRadius: metrics.moderateScale(25),
    borderBottomRightRadius: metrics.moderateScale(25),
  },
  tabPillText: {
    fontSize: metrics.moderateScale(14),
    color: colors.textPrimary,
  },
  tabPillTextActive: {
    color: colors.white,
    fontWeight: "bold",
  },
  tabContent: {
    marginTop: metrics.verticalScale(10),
  },
});
