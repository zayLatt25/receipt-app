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
    marginTop: -verticalScale(200),
  },
  modalTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    color: colors.navyBlue,
    fontFamily: fonts.main,
  },
  modalSubtitle: {
    color: colors.navyBlue,
    marginBottom: verticalScale(8),
    fontWeight: "600",
    fontFamily: fonts.main,
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
    fontFamily: fonts.main,
  },
  saveButtonText: {
    color: colors.navyBlue,
    fontWeight: "bold",
    fontFamily: fonts.main,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: verticalScale(10),
  },
  categoryButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.navyBlue,
    backgroundColor: colors.lightCream,
    marginBottom: verticalScale(10),
    marginRight: scale(10),
  },
  categoryButtonSelected: {
    backgroundColor: colors.navyBlue,
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
});
