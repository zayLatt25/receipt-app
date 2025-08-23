// styles/styles.js
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
} from "../utils/sizes";

export const navyBlue = "#0c2d5d";
export const lightCream = "#e8e5d9";
export const darkPink = "#781d4e";
export const mainFont = "Montserrat";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: navyBlue,
  },
  safeAreaView: {
    flex: 1,
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
    textAlign: "left",
    color: lightCream,
    marginBottom: verticalScale(30),
  },
  pageTitle: {
    fontSize: normalizeFont(40),
    fontFamily: mainFont,
    fontWeight: "bold",
    color: lightCream,
    marginBottom: 0,
    flex: 1,
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
    selectedDayTextColor: lightCream,
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
  reminderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    backgroundColor: lightCream,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  deleteBtn: {
    backgroundColor: darkPink,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteBtnNoBg: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: lightCream,
  },
  swipeDeleteButton: {
    backgroundColor: darkPink,
    justifyContent: "center",
    alignItems: "center",
    width: scale(70),
    height: "100%",
    borderRadius: moderateScale(8),
    marginVertical: verticalScale(8),
    marginRight: scale(8),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(10),
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(25),
    marginBottom: verticalScale(10),
  },
  keyboardAwareViewStyle: {
    paddingBottom: verticalScale(50),
  },

  profileText: {
    fontSize: normalizeFont(16),
    color: lightCream,
    fontFamily: mainFont,
    marginBottom: verticalScale(8),
  },
  tabPill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderRadius: verticalScale(0),
    backgroundColor: "transparent",
    marginHorizontal: scale(2),
    height: "100%",
  },

  scrollViewContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(40),
    backgroundColor: navyBlue,
    flexGrow: 1,
  },
  profileInfoContainer: {
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },

  tabContent: {
    flexGrow: 1,
    minHeight: verticalScale(400),
  },
  statsScrollContent: {
    paddingBottom: verticalScale(40),
  },
  statsSectionHeader: {
    fontWeight: "bold",
    fontSize: normalizeFont(18),
    marginBottom: verticalScale(10),
  },
  statsBudgetLabel: {
    fontWeight: "normal",
    fontSize: normalizeFont(14),
    color: "#fff9",
  },
  statsBarChart: {
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(16),
  },
  monthPickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(10),
    flexWrap: "wrap",
  },
  monthPickerButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(16),
    backgroundColor: "#fff2",
    marginHorizontal: scale(3),
    marginBottom: verticalScale(5),
  },
  monthPickerButtonActive: {
    backgroundColor: "#781d4e",
  },
  monthPickerText: {
    color: "#e8e5d9",
    fontSize: normalizeFont(14),
  },
  monthPickerTextActive: {
    color: "#e8e5d9",
    fontWeight: "bold",
    fontSize: normalizeFont(14),
  },
  yearPickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  yearPickerButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(16),
    backgroundColor: "#fff2",
    marginHorizontal: scale(3),
  },
  yearPickerButtonActive: {
    backgroundColor: "#781d4e",
  },
  yearPickerText: {
    color: "#e8e5d9",
    fontSize: normalizeFont(14),
  },
  yearPickerTextActive: {
    color: "#e8e5d9",
    fontWeight: "bold",
    fontSize: normalizeFont(14),
  },
  statsCategoryHeader: {
    marginTop: verticalScale(24),
  },
  settingsContainer: {
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(12),
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff20",
    marginBottom: verticalScale(10),
  },
  settingInfo: {
    flex: 1,
    marginRight: scale(12),
  },
  settingTitle: {
    fontSize: normalizeFont(16),
    fontFamily: mainFont,
    fontWeight: "600",
    color: lightCream,
    marginBottom: verticalScale(2),
  },
  settingDescription: {
    fontSize: normalizeFont(12),
    fontFamily: mainFont,
    color: "#ffffff80",
    lineHeight: verticalScale(16),
  },
  switchTrackEnabled: "#781d4e",
  switchTrackDisabled: "#ffffff40",
  switchThumbEnabled: lightCream,
  switchThumbDisabled: "#ffffff80",
  weeklySummaryButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(16),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weeklySummaryButtonText: {
    color: lightCream,
    fontSize: normalizeFont(16),
    fontFamily: mainFont,
    fontWeight: "600",
  },
});
