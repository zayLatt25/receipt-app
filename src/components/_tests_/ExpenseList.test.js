import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseList from "../ExpenseList";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    MaterialIcons: (props) => <View {...props} />,
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("ExpenseList Component", () => {
  const mockExpenses = [
    { id: "1", description: "Coffee", amount: 3.5, category: "Food" },
    { id: "2", description: "Lunch", amount: 12, category: "Food" },
    { id: "3", description: "Bus Ticket", amount: 2.5, category: "Transport" },
    { id: "4", description: "Magazine", amount: 5 }, // Uncategorized
  ];

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders total and section headers", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByText } = render(
      <ExpenseList expenses={mockExpenses} onDeleteExpense={mockOnDelete} />
    );

    expect(getByText("Total for the day: $23.00")).toBeTruthy();
    expect(getByText("Food (Total: $15.50)")).toBeTruthy();
    expect(getByText("Transport (Total: $2.50)")).toBeTruthy();
    expect(getByText("Uncategorized (Total: $5.00)")).toBeTruthy();
  });

  it("handles collapsing single-item categories", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByText, queryByText } = render(
      <ExpenseList expenses={mockExpenses} onDeleteExpense={mockOnDelete} />
    );

    const uncategorizedHeader = getByText("Uncategorized (Total: $5.00)");

    // Initially visible
    expect(getByText("Magazine")).toBeTruthy();

    fireEvent.press(uncategorizedHeader);

    await waitFor(() => {
      expect(queryByText("Magazine")).toBeNull();
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "collapsedCategories",
      JSON.stringify({ Uncategorized: true })
    );
  });

  it("loads collapsed state from AsyncStorage for edge cases", async () => {
    AsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({ Food: true, Uncategorized: true })
    );

    const { queryByText } = render(
      <ExpenseList expenses={mockExpenses} onDeleteExpense={mockOnDelete} />
    );

    await waitFor(() => {
      // Collapsed categories hidden
      expect(queryByText("Coffee")).toBeNull();
      expect(queryByText("Lunch")).toBeNull();
      expect(queryByText("Magazine")).toBeNull();

      // Transport remains visible
      expect(queryByText("Bus Ticket")).toBeTruthy();
    });
  });

  it("calls onDeleteExpense when delete button is pressed", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByLabelText } = render(
      <ExpenseList expenses={mockExpenses} onDeleteExpense={mockOnDelete} />
    );

    const deleteButton = getByLabelText("Delete item Coffee");
    fireEvent.press(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("renders correctly with empty expense list", () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByText, queryByText } = render(
      <ExpenseList expenses={[]} onDeleteExpense={mockOnDelete} />
    );

    // Total should be zero
    expect(getByText("Total for the day: $0.00")).toBeTruthy();
    // No sections should render
    expect(queryByText("Food")).toBeNull();
    expect(queryByText("Transport")).toBeNull();
    expect(queryByText("Uncategorized")).toBeNull();
  });
});
