// src/styles/CameraStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./theme";
import { verticalScale, moderateScale, normalizeFont } from "../utils/sizes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: colors.lightCream,
    borderWidth: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginVertical: verticalScale(10),
    width: "90%",
  },
  buttonText: {
    color: colors.navyBlue,
    fontSize: normalizeFont(16),
    fontFamily: "bold",
  },
  disclaimer: {
    marginTop: verticalScale(12),
    fontSize: normalizeFont(12),
    color: "#6b7280",
    textAlign: "center",
  },
  // Loading indicator styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: moderateScale(20),
    padding: verticalScale(30),
    alignItems: "center",
    width: "100%",
    maxWidth: moderateScale(320),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingIconContainer: {
    marginBottom: verticalScale(20),
  },
  loadingTitle: {
    fontSize: normalizeFont(24),
    fontWeight: "bold",
    color: colors.navyBlue,
    marginBottom: verticalScale(10),
    textAlign: "center",
  },
  loadingStage: {
    fontSize: normalizeFont(16),
    color: "#4b5563",
    marginBottom: verticalScale(25),
    textAlign: "center",
    fontStyle: "italic",
  },
  progressContainer: {
    width: "100%",
    marginBottom: verticalScale(25),
  },
  progressBar: {
    width: "100%",
    height: verticalScale(8),
    backgroundColor: "#e5e7eb",
    borderRadius: moderateScale(4),
    overflow: "hidden",
    marginBottom: verticalScale(8),
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.darkPink,
    borderRadius: moderateScale(4),
    transition: "width 0.3s ease",
  },
  progressText: {
    fontSize: normalizeFont(14),
    color: colors.navyBlue,
    textAlign: "center",
    fontWeight: "600",
  },
  loadingSteps: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },
  stepDot: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#d1d5db",
  },
  stepDotActive: {
    backgroundColor: colors.darkPink,
    borderColor: colors.darkPink,
    shadowColor: colors.darkPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepDotText: {
    fontSize: normalizeFont(14),
    fontWeight: "bold",
    color: "#6b7280",
  },
  stepLine: {
    width: moderateScale(40),
    height: 2,
    backgroundColor: "#e5e7eb",
    marginHorizontal: moderateScale(8),
  },
  stepLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: moderateScale(10),
  },
  stepLabel: {
    fontSize: normalizeFont(12),
    color: "#9ca3af",
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  stepLabelActive: {
    color: colors.navyBlue,
    fontWeight: "600",
  },
});
