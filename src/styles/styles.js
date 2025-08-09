// styles/styles.js
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export const navyBlue = "#0c2d5d";
export const lightCream = "#f2efe7";
export const darkPink = "#781d4e";
export const mainFont = "Montserrat";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(30),
    backgroundColor: navyBlue,
  },
  centerContainer: {
    flex: 1,
    padding: scale(20),
    justifyContent: "center",
    backgroundColor: navyBlue,
  },
  input: {
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "#fff",
    marginBottom: verticalScale(10),
    width: "100%",
  },
  title: {
    fontSize: normalizeFont(40),
    fontFamily: mainFont,
    fontWeight: "bold",
    textAlign: "center",
    color: lightCream,
    marginBottom: verticalScale(30),
  },
  subtitle: {
    fontSize: normalizeFont(30),
    textAlign: "center",
    color: lightCream,
    fontFamily: mainFont,
    marginBottom: verticalScale(16),
  },
  bodyText: {
    fontSize: normalizeFont(16),
    color: lightCream,
    fontFamily: mainFont,
    marginBottom: verticalScale(16),
  },
  button: {
    backgroundColor: lightCream,
    borderWidth: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginVertical: verticalScale(10),
    width: "100%",
  },
  buttonText: {
    color: navyBlue,
    fontSize: normalizeFont(16),
    fontWeight: "bold",
  },
  linkText: {
    marginTop: verticalScale(14),
    fontSize: normalizeFont(14),
    color: lightCream,
    textAlign: "center",
  },
  linkTextHighlight: {
    color: darkPink,
    fontWeight: "600",
  },
  navBar: {
    backgroundColor: lightCream,
    borderTopWidth: 0,
    height: verticalScale(55),
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(5),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarWrapper: {
    backgroundColor: navyBlue,
    padding: scale(5),
    marginBottom: verticalScale(5),
  },
  calendarTheme: {
    backgroundColor: navyBlue,
    calendarBackground: navyBlue,
    dayTextColor: lightCream,
    monthTextColor: lightCream,
    textSectionTitleColor: lightCream,
    selectedDayTextColor: "#fff",
    todayTextColor: lightCream,
    arrowColor: lightCream,

    textDayFontSize: normalizeFont(17),
    textMonthFontSize: normalizeFont(17),
    textDayHeaderFontSize: normalizeFont(14),
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: verticalScale(20),
  },
  fabContainer: {
    position: "absolute",
    bottom: verticalScale(30),
    right: scale(30),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabButton: {
    backgroundColor: lightCream,
    borderRadius: moderateScale(30),
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: darkPink,
    fontSize: normalizeFont(14),
    marginBottom: verticalScale(8),
    fontFamily: mainFont,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: lightCream,
    padding: scale(20),
    borderRadius: moderateScale(12),
    width: "85%",
  },
  modalTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    color: navyBlue,
  },
  modalSubtitle: {
    color: navyBlue,
    marginBottom: verticalScale(8),
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: verticalScale(10),
  },
  categoryScroll: {
    marginBottom: verticalScale(12),
  },
  categoryButton: {
    backgroundColor: lightCream,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(20),
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: navyBlue,
  },
  categoryButtonSelected: {
    backgroundColor: navyBlue,
  },
  categoryButtonText: {
    color: navyBlue,
    fontWeight: "normal",
  },
  categoryButtonTextSelected: {
    color: lightCream,
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
    borderColor: navyBlue,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    color: navyBlue,
  },
  addCategoryButton: {
    marginLeft: scale(10),
    backgroundColor: navyBlue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(8),
  },
  addCategoryButtonDisabled: {
    backgroundColor: "#999",
  },
  addCategoryButtonText: {
    color: lightCream,
    fontWeight: "bold",
  },
  cancelButton: {
    marginRight: scale(20),
  },
  cancelButtonText: {
    color: navyBlue,
  },
  saveButtonText: {
    color: navyBlue,
    fontWeight: "bold",
  },
  sectionHeader: {
    backgroundColor: navyBlue,
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
  sectionHeaderText: {
    color: lightCream,
    fontWeight: "bold",
    fontSize: normalizeFont(18),
  },
  collapseArrow: {
    color: lightCream,
    fontWeight: "bold",
    fontSize: normalizeFont(18),
    marginRight: scale(8),
  },
  expenseItem: {
    backgroundColor: lightCream,
    padding: scale(16),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: "row",
  },
  expenseText: {
    color: navyBlue,
    fontSize: normalizeFont(16),
    fontFamily: mainFont,
  },
  expenseItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  expenseDescription: {
    flex: 1,
    fontWeight: "600",
  },
  expenseAmount: {
    fontWeight: "bold",
    fontSize: normalizeFont(16),
  },
  dayTotalContainer: {
    backgroundColor: lightCream,
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  dayTotalText: {
    fontSize: normalizeFont(16),
    fontWeight: "bold",
    color: navyBlue,
  },
});
