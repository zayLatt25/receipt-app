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
});
