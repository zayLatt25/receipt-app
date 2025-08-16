// styles/profileStatsStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./theme";
import { scale, verticalScale, normalizeFont } from "../utils/sizes";

export const profileStatsStyles = StyleSheet.create({
  statsScrollContent: {
    padding: scale(15),
  },
  profileText: {
    color: colors.lightCream,
    fontSize: normalizeFont(16),
    alignSelf: "center",
  },
  statsSectionHeader: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    marginBottom: verticalScale(10),
  },
  statsCategoryHeader: {
    marginTop: verticalScale(20),
  },
  monthPickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: verticalScale(10),
  },
  monthPickerButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(4),
    marginRight: scale(6),
    marginBottom: verticalScale(6),
    backgroundColor: colors.navyBlue,
  },
  monthPickerButtonActive: {
    backgroundColor: colors.darkPink,
  },
  monthPickerText: {
    color: colors.lightCream,
    fontSize: normalizeFont(14),
  },
  monthPickerTextActive: {
    fontWeight: "bold",
  },
  yearPickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: verticalScale(10),
  },
  yearPickerButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(4),
    marginRight: scale(6),
    marginBottom: verticalScale(6),
    backgroundColor: colors.navyBlue,
  },
  yearPickerButtonActive: {
    backgroundColor: colors.darkPink,
  },
  yearPickerText: {
    color: colors.lightCream,
    fontSize: normalizeFont(14),
  },
  yearPickerTextActive: {
    fontWeight: "bold",
  },
  pieBudgetLabel: {
    fontSize: normalizeFont(13),
    color: colors.lightCream,
    alignSelf: "center",
    marginTop: verticalScale(5),
  },
  pieLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  pieLegendColor: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(6),
    borderRadius: scale(3),
  },
  pieLegendText: {
    color: colors.lightCream,
    fontSize: normalizeFont(14),
  },
  chartContainer: {
    alignItems: "center",
  },
  chartPadding: { top: 10, bottom: 30, left: 40, right: 0 },
  axisStyle: {
    tickLabels: { fill: colors.lightCream, fontSize: normalizeFont(12) },
  },
  barStyle: {
    data: { fill: colors.darkPink },
    labels: { fill: colors.lightCream, fontSize: normalizeFont(12) },
  },
  pieContainer: {
    alignItems: "center",
  },
  pieStyle: {
    labels: { fill: colors.lightCream, fontSize: normalizeFont(14) },
  },
  pieLegendContainer: {
    marginTop: scale(10),
  },

  // New empty state styles
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(40),
  },
  emptyStateText: {
    fontSize: normalizeFont(16),
    color: colors.lightCream,
    textAlign: "center",
    marginBottom: verticalScale(15),
  },
  emptyStateButton: {
    backgroundColor: colors.darkPink,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(6),
  },
  emptyStateButtonText: {
    color: colors.lightCream,
    fontSize: normalizeFont(14),
    fontWeight: "bold",
  },
});
