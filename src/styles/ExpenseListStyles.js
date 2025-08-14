// ExpenseListStyles.js
import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: colors.navyBlue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(12),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  collapseArrow: {
    color: colors.lightCream,
    fontWeight: "bold",
    fontSize: normalizeFont(18),
    marginRight: scale(8),
  },
  sectionHeaderText: {
    color: colors.lightCream,
    fontWeight: "bold",
    fontSize: normalizeFont(18),
  },
  expenseItem: {
    backgroundColor: colors.lightCream,
    padding: scale(16),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: "row",
  },
  expenseItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  expenseItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseDetails: {
    flex: 1,
  },
  expenseText: {
    color: colors.navyBlue,
    fontSize: normalizeFont(16),
    fontFamily: fonts.main,
  },
  expenseDescription: {
    flex: 1,
    fontWeight: "600",
  },
  expenseAmount: {
    fontWeight: "bold",
    fontSize: normalizeFont(16),
  },
  deleteBtnColumn: {
    width: scale(65),
  },
  deleteBtnCircle: {
    backgroundColor: colors.darkPink,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(6),
  },
  dayTotalContainer: {
    backgroundColor: colors.lightCream,
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  dayTotalText: {
    fontSize: normalizeFont(16),
    fontWeight: "bold",
    color: colors.navyBlue,
  },
  sectionListContainer: {
    paddingBottom: scale(100),
  },
});
