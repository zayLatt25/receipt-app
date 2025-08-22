// __tests__/AddExpenseModal.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddExpenseModal from "../AddExpenseModal";
import dayjs from "dayjs";
import { predefinedCategories } from "../../utils/constants";

describe("AddExpenseModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        initialDate="2025-08-20"
      />
    );

    expect(
      getByText(`Add Expense - ${dayjs("2025-08-20").format("DD MMM YYYY")}`)
    ).toBeTruthy();
    expect(getByText("Select Category")).toBeTruthy();
  });

  it("resets state when closed", async () => {
    const { rerender, getByPlaceholderText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Expense name"), "Coffee");

    rerender(
      <AddExpenseModal
        visible={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    rerender(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(getByPlaceholderText("Expense name").props.value).toBe("");
  });

  it("shows validation errors when saving with empty fields", () => {
    const { getByText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.press(getByText("Save"));

    expect(getByText("Description is required.")).toBeTruthy();
    expect(getByText("Amount is required.")).toBeTruthy();
    expect(getByText("Please select a category.")).toBeTruthy();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("shows error when invalid amount entered", () => {
    const { getByText, getByPlaceholderText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Expense name"), "Lunch");
    fireEvent.changeText(getByPlaceholderText("Amount"), "0");
    fireEvent.press(getByText("Save"));

    expect(getByText("Amount must be a positive number.")).toBeTruthy();
  });

  it("allows selecting and toggling category", () => {
    const { getByText, queryByText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const category = predefinedCategories[0];
    fireEvent.press(getByText(category));

    // select category → no error
    fireEvent.press(getByText("Save"));
    expect(queryByText("Please select a category.")).toBeNull();

    // toggle off category
    fireEvent.press(getByText(category));
    fireEvent.press(getByText("Save"));
    expect(getByText("Please select a category.")).toBeTruthy();
  });

  it("calls onSave with correct data when valid", () => {
    const { getByText, getByPlaceholderText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Expense name"), "Groceries");
    fireEvent.changeText(getByPlaceholderText("Amount"), "25.50");
    fireEvent.press(getByText(predefinedCategories[1]));
    fireEvent.press(getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      description: "Groceries",
      amount: 25.5,
      date: dayjs().format("YYYY-MM-DD"),
      category: predefinedCategories[1],
    });
  });

  it("calls onClose when Cancel is pressed", () => {
    const { getByText } = render(
      <AddExpenseModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.press(getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
