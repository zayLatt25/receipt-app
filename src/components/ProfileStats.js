import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles, navyBlue, lightCream, darkPink } from "../styles/styles";
import { BarChart, PieChart } from "react-native-chart-kit";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryPie,
} from "victory-native";

const screenWidth = Dimensions.get("window").width - 40;

export default function ProfileStats() {
  const { user } = useAuth();
  const [loadingYearly, setLoadingYearly] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [monthlyBudget, setMonthlyBudget] = useState(1000);

  const chartColors = [
    "#e8e5d9",
    "#781d4e",
    "#f7b267",
    "#f4845f",
    "#4f5d75",
    "#bfc0c0",
    "#6a994e",
    "#386641",
    "#ffb4a2",
    "#b5838d",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from({ length: 5 }, (_, i) => dayjs().year() - i);

  useEffect(() => {
    if (!user) return;
    fetchYearlyStats();
  }, [user, selectedYear]);

  useEffect(() => {
    if (!user) return;
    fetchCategoryStats();
  }, [user, selectedMonth, selectedYear]);

  const fetchYearlyStats = async () => {
    setLoadingYearly(true);
    try {
      const expensesRef = collection(db, "users", user.uid, "expenses");
      const snapshot = await getDocs(expensesRef);
      const expenses = snapshot.docs.map((doc) => doc.data());

      const monthly = Array(12).fill(0);
      expenses.forEach((exp) => {
        if (exp.date) {
          const expDate = dayjs(exp.date);
          if (expDate.year() === selectedYear) {
            monthly[expDate.month()] += Number(exp.amount) || 0;
          }
        }
      });
      setMonthlyTotals(monthly.map((val) => Number(val.toFixed(2))));
    } catch (err) {
      setMonthlyTotals(Array(12).fill(0));
    }
    setLoadingYearly(false);
  };

  const fetchCategoryStats = async () => {
    setLoadingCategory(true);
    try {
      const expensesRef = collection(db, "users", user.uid, "expenses");
      const snapshot = await getDocs(expensesRef);
      const expenses = snapshot.docs.map((doc) => doc.data());

      const catTotals = {};
      expenses.forEach((exp) => {
        if (exp.date) {
          const expDate = dayjs(exp.date);
          if (
            expDate.year() === selectedYear &&
            expDate.month() === selectedMonth &&
            exp.category
          ) {
            catTotals[exp.category] =
              (catTotals[exp.category] || 0) + (Number(exp.amount) || 0);
          }
        }
      });

      const catData = Object.entries(catTotals).map(([cat, amt], i) => ({
        name: cat,
        amount: Number(amt.toFixed(2)),
        color: chartColors[i % chartColors.length],
        legendFontColor: lightCream,
        legendFontSize: 14,
      }));
      setCategoryTotals(catData);
    } catch (err) {
      setCategoryTotals([]);
    }
    setLoadingCategory(false);
  };

  const MonthPicker = () => (
    <View style={styles.monthPickerContainer}>
      {months.map((m, idx) => (
        <TouchableOpacity
          key={m}
          style={[
            styles.monthPickerButton,
            selectedMonth === idx && styles.monthPickerButtonActive,
          ]}
          onPress={() => setSelectedMonth(idx)}
        >
          <Text
            style={[
              styles.monthPickerText,
              selectedMonth === idx && styles.monthPickerTextActive,
            ]}
          >
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const YearPicker = () => (
    <View style={styles.yearPickerContainer}>
      {years.map((y) => (
        <TouchableOpacity
          key={y}
          style={[
            styles.yearPickerButton,
            selectedYear === y && styles.yearPickerButtonActive,
          ]}
          onPress={() => setSelectedYear(y)}
        >
          <Text
            style={[
              styles.yearPickerText,
              selectedYear === y && styles.yearPickerTextActive,
            ]}
          >
            {y}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.statsScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.profileText, styles.statsSectionHeader]}>
        Yearly Spending ({selectedYear}){" "}
        <Text style={styles.statsBudgetLabel}>
          (Budget: ${monthlyBudget}/mo)
        </Text>
      </Text>
      <YearPicker />
      {loadingYearly ? (
        <ActivityIndicator color={lightCream} size="large" />
      ) : (
        <View style={{ alignItems: "center" }}>
          <VictoryChart
            width={screenWidth}
            height={240}
            domainPadding={{ x: 20, y: 20 }}
          >
            <VictoryAxis
              tickValues={months.map((_, i) => i)}
              tickFormat={months}
              style={{
                axis: { stroke: lightCream },
                tickLabels: {
                  fill: lightCream,
                  fontSize: 12,
                  angle: -45,
                  padding: 15,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `$${x}`}
              style={{
                axis: { stroke: lightCream },
                grid: { stroke: "#fff2" },
                tickLabels: { fill: lightCream, fontSize: 12 },
              }}
              // Optional: set max Y-axis
              domain={[0, Math.max(...monthlyTotals, monthlyBudget)]}
            />
            <VictoryBar
              data={monthlyTotals.map((val, i) => ({ x: i, y: val }))}
              style={{
                data: { fill: darkPink, width: 20 },
                labels: { fill: lightCream },
              }}
              labels={({ datum }) => `$${datum.y}`}
            />
          </VictoryChart>
        </View>
      )}

      <Text
        style={[
          styles.profileText,
          styles.statsSectionHeader,
          styles.statsCategoryHeader,
        ]}
      >
        Category Breakdown ({months[selectedMonth]} {selectedYear})
      </Text>
      <MonthPicker />
      {loadingCategory ? (
        <ActivityIndicator color={lightCream} size="large" />
      ) : categoryTotals.length === 0 ? (
        <Text style={styles.profileText}>No data for this month.</Text>
      ) : (
        <View style={{ alignItems: "center" }}>
          <VictoryPie
            data={categoryTotals.map((cat) => ({ x: cat.name, y: cat.amount }))}
            colorScale={categoryTotals.map((cat) => cat.color)}
            labels={({ datum }) => `$${datum.y.toFixed(2)}`}
            labelRadius={50}
            style={{
              labels: { fill: lightCream, fontSize: 12 },
            }}
            width={screenWidth}
            height={210}
          />

          {/* Custom Legend */}
          <View style={{ marginTop: 10 }}>
            {categoryTotals.map((cat) => (
              <View
                key={cat.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: cat.color,
                    marginRight: 6,
                    borderRadius: 3,
                  }}
                />
                <Text style={{ color: lightCream, fontSize: 14 }}>
                  ${cat.amount.toFixed(2)} {cat.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
