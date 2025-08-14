// styles/AddExpenseModalStyles.js
import { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.lightCream,
    padding: scale(20),
    borderRadius: moderateScale(12),
    width: "85%",
  },
  modalTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    color: colors.navyBlue,
  },
  modalSubtitle: {
    color: colors.navyBlue,
    marginBottom: verticalScale(8),
    fontWeight: "600",
  },
  categoryScroll: {
    marginBottom: verticalScale(12),
  },
  categoryButton: {
    backgroundColor: colors.lightCream,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(20),
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: colors.navyBlue,
  },
  categoryButtonSelected: {
    backgroundColor: colors.navyBlue,
  },
  categoryButtonText: {
    color: colors.navyBlue,
    fontWeight: "normal",
  },
  categoryButtonTextSelected: {
    color: colors.lightCream,
    fontWeight: "bold",
  },
  customCategoryRow: {
    flexDirection: "row",
    marginBottom: verticalScale(12),
    alignItems: "center",
  },
  customCategoryInput: {
    flex: 1,
    height: verticalScale(40),
    borderColor: colors.navyBlue,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    color: colors.navyBlue,
  },
  addCategoryButton: {
    marginLeft: scale(10),
    backgroundColor: colors.navyBlue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(8),
  },
  addCategoryButtonDisabled: {
    backgroundColor: "#999",
  },
  addCategoryButtonText: {
    color: colors.lightCream,
    fontWeight: "bold",
  },
  errorText: {
    color: colors.darkPink,
    fontSize: normalizeFont(14),
    marginBottom: verticalScale(8),
    fontFamily: fonts.main,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: verticalScale(10),
  },
  cancelButton: {
    marginRight: scale(20),
  },
  cancelButtonText: {
    color: colors.navyBlue,
  },
  saveButtonText: {
    color: colors.navyBlue,
    fontWeight: "bold",
  },
});
