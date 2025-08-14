import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(40),
    backgroundColor: colors.navyBlue,
    flexGrow: 1,
  },
  profileInfoContainer: {
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },
  title: {
    fontSize: fonts.titleSize,
    fontFamily: fonts.main,
    fontWeight: "bold",
    color: colors.lightCream,
    marginBottom: verticalScale(10),
  },
  profileText: {
    fontSize: normalizeFont(16),
    color: colors.lightCream,
    fontFamily: fonts.main,
    marginBottom: verticalScale(8),
  },
  logoutButton: {
    backgroundColor: colors.lightCream,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
    alignSelf: "center",
    width: "100%",
    height: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: colors.lightCream,
    fontWeight: "bold",
    fontSize: normalizeFont(14),
  },
  tabBarContainer: {
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff2",
    borderRadius: verticalScale(20),
    overflow: "hidden",
    width: 220,
    height: 38,
    elevation: 2,
  },
  tabPill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderRadius: verticalScale(0),
    backgroundColor: "transparent",
    marginHorizontal: scale(2),
    height: "100%",
  },
  tabPillActive: {
    backgroundColor: "#e8e5d9",
  },
  tabPillLeftActive: {
    borderTopLeftRadius: verticalScale(20),
    borderBottomLeftRadius: verticalScale(20),
  },
  tabPillRightActive: {
    borderTopRightRadius: verticalScale(20),
    borderBottomRightRadius: verticalScale(20),
  },
  tabPillText: {
    color: "#e8e5d9",
    fontWeight: "bold",
    fontSize: normalizeFont(14),
  },
  tabPillTextActive: {
    color: "#0c2d5d",
  },
  tabContent: {
    flexGrow: 1,
    minHeight: verticalScale(400),
  },
});
