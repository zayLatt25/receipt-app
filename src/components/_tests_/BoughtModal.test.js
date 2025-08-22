import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import BoughtModal from "../BoughtModal";
import dayjs from "dayjs";

// Mock DateTimePicker
jest.mock("@react-native-community/datetimepicker", () => {
  const { TouchableOpacity, Text } = require("react-native");

  return ({ onChange }) => (
    <TouchableOpacity
      testID="mock-datetimepicker"
      onPress={() => onChange({}, new Date("2024-01-01"))}
    >
      <Text>Pick Date</Text>
    </TouchableOpacity>
  );
});

describe("BoughtModal", () => {
  const groceries = [
    { id: "1", name: "Milk" },
    { id: "2", name: "Eggs" },
  ];

  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    selectedIds: ["1"],
    groceries,
    onSaveBought: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders selected items in the modal", () => {
    const { getByTestId } = render(<BoughtModal {...defaultProps} />);
    expect(getByTestId("selectedItems").props.children).toContain("Milk");
  });

  it("opens the date picker and sets a new date", async () => {
    const { getByTestId } = render(<BoughtModal {...defaultProps} />);

    fireEvent.press(getByTestId("openDatePicker"));
    fireEvent.press(getByTestId("mock-datetimepicker"));

    await waitFor(() => {
      expect(getByTestId("dateText").props.children.join("")).toContain(
        dayjs("2024-01-01").format("DD MMM YYYY")
      );
    });
  });

  it("selects a predefined category", () => {
    const { getByTestId } = render(<BoughtModal {...defaultProps} />);
    fireEvent.press(getByTestId("categoryButton-Grocery"));
    expect(getByTestId("categoryText-Grocery").props.children).toBe("Grocery");
  });

  it("shows validation error if no category selected", () => {
    const { getByTestId } = render(<BoughtModal {...defaultProps} />);
    fireEvent.press(getByTestId("saveButton"));
    expect(getByTestId("categoryError").props.children).toBe(
      "Please select or add a category."
    );
  });

  it("calls onSaveBought with correct params when valid", () => {
    const { getByTestId } = render(<BoughtModal {...defaultProps} />);

    fireEvent.press(getByTestId("categoryButton-Grocery"));
    fireEvent.press(getByTestId("saveButton"));

    expect(defaultProps.onSaveBought).toHaveBeenCalledTimes(1);

    const callArgs = defaultProps.onSaveBought.mock.calls[0];
    expect(callArgs[0]).toEqual([{ id: "1", name: "Milk" }]); // items
    expect(callArgs[1]).toMatch(/^\d{4}-\d{2}-\d{2}$/); // date in YYYY-MM-DD
    expect(callArgs[2]).toBe("Grocery");
  });
});
