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

  // Chart colors for pie
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

  // Month labels
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

  // Allow user to pick from 5 years (current and previous 4)
  const years = Array.from({ length: 5 }, (_, i) => dayjs().year() - i);

  // Fetch yearly stats when year or user changes
  useEffect(() => {
    if (!user) return;
    fetchYearlyStats();
  }, [user, selectedYear]);

  // Fetch category stats when month, year, or user changes
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

      // Separate name and display label
      const catData = Object.entries(catTotals).map(([cat, amt], i) => ({
        name: cat, // just the category name for internal use
        amount: Number(amt.toFixed(2)),
        color: chartColors[i % chartColors.length],
        legendFontColor: lightCream,
        legendFontSize: 14,
        displayLabel: `${cat} ($${Number(amt).toFixed(2)})`, // for legend
      }));

      setCategoryTotals(catData);
    } catch (err) {
      setCategoryTotals([]);
    }
    setLoadingCategory(false);
  };

  // Month Picker UI
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

  // Year Picker UI
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
        <BarChart
          data={{
            labels: months,
            datasets: [{ data: monthlyTotals }],
          }}
          width={screenWidth}
          height={240}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: navyBlue,
            backgroundGradientFrom: navyBlue,
            backgroundGradientTo: navyBlue,
            decimalPlaces: 0,
            color: () => lightCream,
            labelColor: () => lightCream,
            propsForBackgroundLines: { stroke: "#fff2" },
            barPercentage: 0.7,
          }}
          style={styles.statsBarChart}
          fromZero
          showValuesOnTopOfBars
          withHorizontalLines
          segments={5}
        />
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
        <PieChart
          data={categoryTotals.map((cat) => ({
            name: cat.name,
            population: cat.amount,
            color: cat.color,
            legendFontColor: cat.legendFontColor,
            legendFontSize: cat.legendFontSize,
            legendLabel: cat.displayLabel, // custom label for legend
          }))}
          width={screenWidth}
          height={210}
          chartConfig={{
            color: () => lightCream,
            labelColor: () => lightCream,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      )}
    </ScrollView>
  );
}
