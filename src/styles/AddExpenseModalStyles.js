// styles/AddExpenseModalStyles.js
import { StyleSheet } from "react-native";
import { colors, fonts, metrics } from "./theme";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.lightCream,
    padding: metrics.scale(20),
    borderRadius: metrics.moderateScale(12),
    width: "85%",
  },
  modalTitle: {
    fontSize: metrics.normalizeFont(18),
    fontWeight: "bold",
    marginBottom: metrics.verticalScale(12),
    color: colors.navyBlue,
  },
  modalSubtitle: {
    color: colors.navyBlue,
    marginBottom: metrics.verticalScale(8),
    fontWeight: "600",
  },
  categoryScroll: {
    marginBottom: metrics.verticalScale(12),
  },
  categoryButton: {
    backgroundColor: colors.lightCream,
    paddingVertical: metrics.verticalScale(8),
    paddingHorizontal: metrics.scale(14),
    borderRadius: metrics.moderateScale(20),
    marginRight: metrics.scale(10),
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
    marginBottom: metrics.verticalScale(12),
    alignItems: "center",
  },
  customCategoryInput: {
    flex: 1,
    height: metrics.verticalScale(40),
    borderColor: colors.navyBlue,
    borderWidth: 1,
    borderRadius: metrics.moderateScale(8),
    paddingHorizontal: metrics.scale(10),
    color: colors.navyBlue,
  },
  addCategoryButton: {
    marginLeft: metrics.scale(10),
    backgroundColor: colors.navyBlue,
    paddingVertical: metrics.verticalScale(10),
    paddingHorizontal: metrics.scale(15),
    borderRadius: metrics.moderateScale(8),
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
    fontSize: metrics.normalizeFont(14),
    marginBottom: metrics.verticalScale(8),
    fontFamily: fonts.main,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: metrics.verticalScale(10),
  },
  cancelButton: {
    marginRight: metrics.scale(20),
  },
  cancelButtonText: {
    color: colors.navyBlue,
  },
  saveButtonText: {
    color: colors.navyBlue,
    fontWeight: "bold",
  },
});
