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
    maxWidth: scale(400),
  },
  modalTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    marginBottom: verticalScale(16),
    color: colors.navyBlue,
    fontFamily: fonts.main,
    textAlign: "center",
  },
  passwordHint: {
    fontSize: normalizeFont(12),
    color: colors.navyBlue,
    fontFamily: fonts.main,
    marginBottom: verticalScale(20),
    textAlign: "center",
    fontStyle: "italic",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
  },
  modalButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(5),
  },
  cancelButton: {
    backgroundColor: colors.lightCream,
    borderWidth: 1,
    borderColor: colors.navyBlue,
  },
  confirmButton: {
    backgroundColor: colors.darkPink,
  },
  cancelButtonText: {
    color: colors.navyBlue,
    fontSize: normalizeFont(14),
    fontFamily: fonts.main,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: colors.lightCream,
    fontSize: normalizeFont(14),
    fontFamily: fonts.main,
    fontWeight: "600",
  },
});
