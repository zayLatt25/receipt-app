// styles/styles.js
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";
import { colors } from "./theme";

export const navyBlue = "#0c2d5d";
export const darkPink = "#781d4e";
export const mainFont = "Montserrat";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: navyBlue,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: navyBlue,
  },
  input: {
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "#fff",
    marginBottom: verticalScale(10),
    width: "100%",
  },
  title: {
    fontSize: normalizeFont(40),
    fontFamily: mainFont,
    fontWeight: "bold",
    textAlign: "left",
    color: colors.lightCream,
    marginBottom: verticalScale(30),
  },
  pageTitle: {
    fontSize: normalizeFont(40),
    fontFamily: mainFont,
    fontWeight: "bold",
    color: colors.lightCream,
    marginBottom: 0,
    flex: 1,
  },
  subtitle: {
    fontSize: normalizeFont(30),
    textAlign: "center",
    color: colors.lightCream,
    fontFamily: mainFont,
    marginBottom: verticalScale(16),
  },
  bodyText: {
    fontSize: normalizeFont(16),
    color: colors.lightCream,
    fontFamily: mainFont,
    marginBottom: verticalScale(16),
  },
  buttonText: {
    color: navyBlue,
    fontSize: normalizeFont(16),
    fontWeight: "bold",
  },
  linkText: {
    marginTop: verticalScale(14),
    fontSize: normalizeFont(14),
    color: colors.lightCream,
    textAlign: "center",
  },
  linkTextHighlight: {
    color: darkPink,
    fontWeight: "600",
  },
  navBar: {
    backgroundColor: colors.lightCream,
    borderTopWidth: 0,
    height: verticalScale(55),
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(5),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: verticalScale(20),
  },
  errorText: {
    color: darkPink,
    fontSize: normalizeFont(14),
    marginBottom: verticalScale(8),
    fontFamily: mainFont,
  },
});
