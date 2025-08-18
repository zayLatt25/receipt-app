import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    borderColor: "blue",
    backgroundColor: "#dbeafe",
  },
  unselectedCategory: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  itemsContainer: {
    marginTop: 15,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 5,
    marginRight: 5,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  confirmButton: {
    padding: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
