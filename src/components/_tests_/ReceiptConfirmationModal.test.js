// __tests__/ReceiptConfirmationModal.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import ReceiptConfirmationModal from "../ReceiptConfirmationModal";
import { addDoc, collection } from "firebase/firestore";
import { predefinedCategories } from "../../utils/constants";

// Mock Alert.alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

// Mock Firebase
jest.mock("../../firebase", () => ({
  db: {},
}));

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0 }),
}));

// Mock LoadingSpinner
jest.mock("../LoadingSpinner", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return ({ size, color }) => (
    <View testID="loading-spinner">
      <Text>Loading...</Text>
    </View>
  );
});

describe("ReceiptConfirmationModal", () => {
  const mockOnClose = jest.fn();
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com",
  };

  const createMockReceiptData = () => ({
    purchaseDate: "2025-01-15",
    suggestedCategory: "Grocery",
    items: [
      { name: "Milk", pieces: "2", price: "3.50" },
      { name: "Bread", pieces: "1", price: "2.00" },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();
    addDoc.mockResolvedValue({ id: "test-expense-id" });
    collection.mockReturnValue("mock-collection");
  });

  it("renders correctly when visible", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    expect(getByText("Confirm Receipt")).toBeTruthy();
    expect(getByText("Purchase Date")).toBeTruthy();
    expect(getByText("Category")).toBeTruthy();
    expect(getByText("Total: $9.00")).toBeTruthy();
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Confirm")).toBeTruthy();
  });

  it("initializes with receipt data when provided", () => {
    const { getByDisplayValue } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    expect(getByDisplayValue("2025-01-15")).toBeTruthy();
    expect(getByDisplayValue("Milk")).toBeTruthy();
    expect(getByDisplayValue("2")).toBeTruthy();
    expect(getByDisplayValue("3.50")).toBeTruthy();
  });

  it("allows editing purchase date", () => {
    const { getByPlaceholderText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    const dateInput = getByPlaceholderText("YYYY-MM-DD");
    fireEvent.changeText(dateInput, "2025-01-20");

    expect(dateInput.props.value).toBe("2025-01-20");
  });

  it("allows category selection", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    // Initially Grocery should be selected
    expect(getByText("Grocery")).toBeTruthy();

    // Select Transport category
    fireEvent.press(getByText("Transport"));
    expect(getByText("Transport")).toBeTruthy();
  });

  it("allows editing item details", () => {
    const { getByDisplayValue } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    const nameInput = getByDisplayValue("Milk");
    const quantityInput = getByDisplayValue("2");
    const priceInput = getByDisplayValue("3.50");

    fireEvent.changeText(nameInput, "Chocolate Milk");
    fireEvent.changeText(quantityInput, "3");
    fireEvent.changeText(priceInput, "4.00");

    expect(nameInput.props.value).toBe("Chocolate Milk");
    expect(quantityInput.props.value).toBe("3");
    expect(priceInput.props.value).toBe("4.00");
  });

  it("filters non-numeric characters from quantity and price inputs", () => {
    const { getByDisplayValue } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    const quantityInput = getByDisplayValue("2");
    const priceInput = getByDisplayValue("3.50");

    fireEvent.changeText(quantityInput, "2abc");
    fireEvent.changeText(priceInput, "3.50xyz");

    expect(quantityInput.props.value).toBe("2");
    expect(priceInput.props.value).toBe("3.50");
  });

  it("calculates total amount correctly", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    // 2 * 3.50 + 1 * 2.00 = 9.00
    expect(getByText("Total: $9.00")).toBeTruthy();
  });

  it("updates total when items are modified", () => {
    const { getByText, getByDisplayValue } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    const priceInput = getByDisplayValue("3.50");
    fireEvent.changeText(priceInput, "5.00");

    // 2 * 5.00 + 1 * 2.00 = 12.00
    expect(getByText("Total: $12.00")).toBeTruthy();
  });

  it("shows validation error when required fields are missing", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={{ items: [] }}
        user={mockUser}
      />
    );

    fireEvent.press(getByText("Confirm"));

    expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fill all required fields.");
  });

  it("shows validation error when no items exist", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={{ purchaseDate: "2025-01-15", items: [] }}
        user={mockUser}
      />
    );

    fireEvent.press(getByText("Confirm"));

    expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fill all required fields.");
  });

  it("calls onClose when Cancel is pressed", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    fireEvent.press(getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("handles missing user gracefully", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={null}
      />
    );

    // Should render without crashing
    expect(getByText("Confirm Receipt")).toBeTruthy();
  });

  it("displays all predefined categories", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    // Check that all predefined categories are displayed
    predefinedCategories.forEach(category => {
      expect(getByText(category)).toBeTruthy();
    });
  });

  it("renders correct number of item rows", () => {
    const { getByDisplayValue } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    // Should have 2 items
    expect(getByDisplayValue("Milk")).toBeTruthy();
    expect(getByDisplayValue("Bread")).toBeTruthy();
  });

  it("handles empty receipt data gracefully", () => {
    const { getByText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={{}}
        user={mockUser}
      />
    );

    // Should render without crashing
    expect(getByText("Confirm Receipt")).toBeTruthy();
    expect(getByText("Total: $0.00")).toBeTruthy();
  });

  it("displays correct placeholder text in inputs", () => {
    const { getByPlaceholderText, getAllByPlaceholderText } = render(
      <ReceiptConfirmationModal
        visible={true}
        onClose={mockOnClose}
        receiptData={createMockReceiptData()}
        user={mockUser}
      />
    );

    expect(getByPlaceholderText("YYYY-MM-DD")).toBeTruthy();
    
    // Check that we have the correct number of inputs with these placeholders
    expect(getAllByPlaceholderText("Name")).toHaveLength(2); // One for each item
    expect(getAllByPlaceholderText("Qty")).toHaveLength(2); // One for each item
    expect(getAllByPlaceholderText("Price")).toHaveLength(2); // One for each item
  });
}); 