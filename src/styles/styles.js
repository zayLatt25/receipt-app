// styles/styles.js
import { StyleSheet } from "react-native";

const navyBlue = "#0c2d5d";
const lightCream = "#f2efe7";
const darkPink = "#781d4e";

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
});
