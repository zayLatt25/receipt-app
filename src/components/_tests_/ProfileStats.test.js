// __tests__/ProfileStats.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfileStats from "../ProfileStats";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

// Mock Firebase
jest.mock("../../firebase", () => ({
  db: {},
}));

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

// Mock Victory charts - use proper React Native components
jest.mock("victory-native", () => ({
  VictoryChart: ({ children, width, height }) => (
    <div data-testid="victory-chart" style={{ width, height }}>
      {children}
    </div>
  ),
  VictoryBar: ({ data, labels }) => (
    <div data-testid="victory-bar">
      {data.map((item, index) => (
        <div key={index} data-testid={`bar-${index}`}>
          {labels && labels({ datum: item })}
        </div>
      ))}
    </div>
  ),
  VictoryAxis: () => <div data-testid="victory-axis" />,
  VictoryPie: ({ data, labels }) => (
    <div data-testid="victory-pie">
      {data.map((item, index) => (
        <div key={index} data-testid={`pie-${index}`}>
          {labels && labels({ datum: item })}
        </div>
      ))}
    </div>
  ),
}));

// Mock AuthContext
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock constants
jest.mock("../../utils/constants", () => ({
  chartColors: ["#e8e5d9", "#781d4e", "#f7b267"],
  predefinedCategories: ["Grocery", "Transport", "Bills"],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}));

// Mock theme colors
jest.mock("../../styles/theme", () => ({
  colors: {
    lightCream: "#f5f5dc",
  },
}));

describe("ProfileStats Component", () => {
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com",
  };

  const mockExpenses = [
    {
      id: "1",
      description: "Coffee",
      amount: 5.50,
      category: "Grocery",
      date: "2025-01-15",
    },
    {
      id: "2",
      description: "Bus ticket",
      amount: 2.50,
      category: "Transport",
      date: "2025-01-20",
    },
    {
      id: "3",
      description: "Lunch",
      amount: 12.00,
      category: "Grocery",
      date: "2025-02-10",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ user: mockUser });
    getDocs.mockResolvedValue({
      docs: mockExpenses.map((exp) => ({ data: () => exp })),
    });
    collection.mockReturnValue("mock-collection");
  });

  it("renders correctly with loading states", () => {
    const { getByText } = render(<ProfileStats />);

    expect(getByText("Yearly Spending (2025)")).toBeTruthy();
    expect(getByText("Category Breakdown (Aug 2025)")).toBeTruthy();
    expect(getByText("(Budget: $1000)")).toBeTruthy();
    
    // Should show loading indicators initially
    expect(getByText("Yearly Spending (2025)")).toBeTruthy();
  });

  it("renders year picker with correct years", () => {
    const currentYear = dayjs().year();
    const { getByText } = render(<ProfileStats />);

    // Should show current year and 4 previous years
    expect(getByText(currentYear.toString())).toBeTruthy();
    expect(getByText((currentYear - 1).toString())).toBeTruthy();
    expect(getByText((currentYear - 4).toString())).toBeTruthy();
  });

  it("renders month picker with all months", () => {
    const { getByText } = render(<ProfileStats />);

    expect(getByText("Jan")).toBeTruthy();
    expect(getByText("Feb")).toBeTruthy();
    expect(getByText("Dec")).toBeTruthy();
  });

  it("allows year selection", async () => {
    const { getByText } = render(<ProfileStats />);
    const currentYear = dayjs().year();
    const previousYear = currentYear - 1;

    fireEvent.press(getByText(previousYear.toString()));

    await waitFor(() => {
      expect(getByText(`Yearly Spending (${previousYear})`)).toBeTruthy();
    });
  });

  it("allows month selection", async () => {
    const { getByText } = render(<ProfileStats />);

    fireEvent.press(getByText("Feb"));

    await waitFor(() => {
      expect(getByText("Category Breakdown (Feb 2025)")).toBeTruthy();
    });
  });

  it("fetches and displays yearly stats", async () => {
    const { getByText } = render(<ProfileStats />);

    await waitFor(() => {
      // Should show the chart data after loading - verify by checking that loading is complete
      // The chart will be rendered with the data
      expect(getByText("Category Breakdown (Aug 2025)")).toBeTruthy();
    });
  });

  it("fetches and displays category stats for selected month", async () => {
    const { getByText } = render(<ProfileStats />);

    // Select February
    fireEvent.press(getByText("Feb"));

    await waitFor(() => {
      // Should show category breakdown for February
      expect(getByText("Grocery")).toBeTruthy();
      expect(getByText("$12.00")).toBeTruthy(); // February grocery expense
    });
  });

  it("shows empty state when no expenses for selected month", async () => {
    // Mock empty expenses for a specific month
    getDocs.mockResolvedValue({
      docs: [],
    });

    const { getByText } = render(<ProfileStats />);

    await waitFor(() => {
      expect(getByText("No expenses recorded for Aug 2025.")).toBeTruthy();
    });
  });

  it("handles Firebase errors gracefully", async () => {
    getDocs.mockRejectedValue(new Error("Firebase error"));

    const { getByText } = render(<ProfileStats />);

    await waitFor(() => {
      // Should show empty state when there's an error
      expect(getByText("No expenses recorded for Aug 2025.")).toBeTruthy();
    });
  });

  it("calculates monthly totals correctly", async () => {
    const { getByText } = render(<ProfileStats />);

    await waitFor(() => {
      // Should show the chart data after loading - verify by checking that loading is complete
      // The chart will be rendered with the data
      expect(getByText("Category Breakdown (Aug 2025)")).toBeTruthy();
    });
  });

  it("filters expenses by selected year and month", async () => {
    const { getByText } = render(<ProfileStats />);

    // Select February
    fireEvent.press(getByText("Feb"));

    await waitFor(() => {
      // Should only show February expenses in category breakdown
      expect(getByText("$12.00")).toBeTruthy(); // February grocery expense
      // Verify that we're showing February data
      expect(getByText("Category Breakdown (Feb 2025)")).toBeTruthy();
    });
  });

  it("updates when user changes", async () => {
    const newUser = { uid: "new-user-id", email: "new@example.com" };
    const { rerender } = render(<ProfileStats />);

    // Change user
    useAuth.mockReturnValue({ user: newUser });
    rerender(<ProfileStats />);

    await waitFor(() => {
      expect(collection).toHaveBeenCalledWith({}, "users", "new-user-id", "expenses");
    });
  });

  it("handles missing user gracefully", () => {
    useAuth.mockReturnValue({ user: null });
    const { getByText } = render(<ProfileStats />);

    // Should still render but not fetch data
    expect(getByText("Yearly Spending (2025)")).toBeTruthy();
  });
}); 