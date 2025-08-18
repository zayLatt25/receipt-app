// styles/ReceiptConfirmationStyles.js
import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: normalizeFont(20),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    color: colors.lightCream,
    fontFamily: fonts.main,
  },
  label: {
    fontSize: normalizeFont(14),
    fontWeight: "600",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(6),
    color: colors.lightCream,
    fontFamily: fonts.main,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    fontSize: normalizeFont(16),
    backgroundColor: colors.lightCream,
    marginBottom: verticalScale(10),
    fontFamily: fonts.main,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: verticalScale(10),
  },
  categoryButton: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(13),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.navyBlue,
    backgroundColor: colors.lightCream,
    marginBottom: verticalScale(10),
    marginRight: scale(10),
  },
  selectedCategory: {
    backgroundColor: colors.darkPink,
  },
  unselectedCategory: {
    backgroundColor: colors.lightCream,
    borderColor: colors.navyBlue,
  },
  categoryButtonText: {
    color: colors.navyBlue,
    fontWeight: "400",
    fontFamily: fonts.main,
  },
  categoryButtonTextSelected: {
    color: colors.lightCream,
    fontWeight: "600",
    fontFamily: fonts.main,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  itemInput: {
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    fontSize: normalizeFont(15),
    backgroundColor: colors.lightCream,
    fontFamily: fonts.main,
  },
  totalText: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    color: colors.navyBlue,
    fontFamily: fonts.main,
    marginBottom: verticalScale(5),
    marginTop: verticalScale(5),
    paddingHorizontal: scale(10),
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    backgroundColor: colors.lightGrey,
    flex: 1,
    marginRight: scale(8),
    alignItems: "center",
  },
  confirmButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    backgroundColor: colors.darkPink,
    flex: 1,
    marginLeft: scale(8),
    alignItems: "center",
  },
  confirmButtonText: {
    color: colors.lightCream,
    fontWeight: "600",
    fontSize: normalizeFont(16),
    fontFamily: fonts.main,
  },
  footerContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    paddingBottom: verticalScale(16),
    borderTopWidth: 1,
    borderColor: colors.navyBlue,
    backgroundColor: colors.lightCream,
  },
});
