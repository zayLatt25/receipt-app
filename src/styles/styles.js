// styles/styles.js
import { StyleSheet } from "react-native";

// Define color constants
export const navyBlue = "#0c2d5d";
export const lightCream = "#f2efe7";
export const darkPink = "#781d4e";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
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
});
