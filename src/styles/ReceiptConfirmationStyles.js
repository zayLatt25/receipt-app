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
    paddingTop: verticalScale(20),
  },
  headerContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(10),
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: verticalScale(5),
  },
  categoryButton: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(13),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.navyBlue,
    backgroundColor: colors.lightCream,
    marginBottom: verticalScale(10),
    marginRight: scale(5),
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
  itemInputsContainer: {
    flexDirection: "row",
  },
  itemInputCommon: {
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    fontSize: normalizeFont(15),
    backgroundColor: colors.lightCream,
    fontFamily: fonts.main,
    marginRight: scale(5),
  },
  itemNameInput: {
    width: scale(172),
  },
  itemQtyInput: {
    width: scale(50),
  },
  priceContainer: {
    width: scale(70),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(5),
    backgroundColor: colors.lightCream,
  },
  priceSign: {
    fontSize: normalizeFont(15),
    fontWeight: "bold",
    marginRight: scale(3),
    color: colors.navyBlue,
  },
  itemPriceInput: {
    flex: 1,
    fontSize: normalizeFont(15),
    paddingVertical: verticalScale(6),
    fontFamily: fonts.main,
  },
  totalText: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    color: colors.navyBlue,
    fontFamily: fonts.main,
    marginVertical: verticalScale(5),
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginRight: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    backgroundColor: colors.lightGrey,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    marginLeft: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    backgroundColor: colors.darkPink,
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
  deleteBtnCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(6),
    backgroundColor: colors.darkPink,
  },
  scrollableContent: {
    flex: 1,
  },
  flatListStyle: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
});
