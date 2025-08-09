// styles/styles.js
import { StyleSheet } from "react-native";

export const navyBlue = "#0c2d5d";
export const lightCream = "#f2efe7";
export const darkPink = "#781d4e";
export const mainFont = "Montserrat";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: navyBlue,
  },
  centerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: navyBlue,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textAlign: "center",
    color: lightCream,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 30,
    textAlign: "center",
    color: lightCream,
    fontFamily: "Montserrat",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    color: lightCream,
    fontFamily: "Montserrat",
    marginBottom: 16,
  },
  button: {
    backgroundColor: lightCream,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: lightCream,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 14,
    fontSize: 14,
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
    height: 73,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarWrapper: {
    backgroundColor: navyBlue,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  calendarStyle: {
    borderRadius: 10,
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

    textDayFontSize: 17,
    textMonthFontSize: 17,
    textDayHeaderFontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  expenseItem: {
    backgroundColor: lightCream,
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseText: {
    color: navyBlue,
    fontSize: 16,
    fontFamily: mainFont,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabButton: {
    backgroundColor: lightCream,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: darkPink,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Montserrat",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: lightCream,
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: navyBlue,
  },
  modalSubtitle: {
    color: navyBlue,
    marginBottom: 8,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: lightCream,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
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
    marginBottom: 12,
    alignItems: "center",
  },
  customCategoryInput: {
    flex: 1,
    height: 40,
    borderColor: navyBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: navyBlue,
  },
  addCategoryButton: {
    marginLeft: 10,
    backgroundColor: navyBlue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addCategoryButtonDisabled: {
    backgroundColor: "#999",
  },
  addCategoryButtonText: {
    color: lightCream,
    fontWeight: "bold",
  },
  cancelButton: {
    marginRight: 20,
  },
  cancelButtonText: {
    color: navyBlue,
  },
  saveButtonText: {
    color: navyBlue,
    fontWeight: "bold",
  },
});
