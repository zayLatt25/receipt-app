// ProfileStats.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryPie,
} from "victory-native";
import { profileStatsStyles as styles } from "../styles/ProfileStatsStyles";
import { colors } from "../styles/theme";
import { chartColors, predefinedCategories, months } from "../utils/constants";

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
  const pieSize = screenWidth * 0.8;

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
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "expenses")
      );
      const expenses = snapshot.docs.map((doc) => doc.data());
      const monthly = Array(12).fill(0);

      expenses.forEach((exp) => {
        if (exp.date) {
          const expDate = dayjs(exp.date);
          if (expDate.year() === selectedYear)
            monthly[expDate.month()] += Number(exp.amount) || 0;
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
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "expenses")
      );
      const expenses = snapshot.docs.map((doc) => doc.data());

      const catTotals = predefinedCategories.reduce((acc, cat) => {
        acc[cat] = 0;
        return acc;
      }, {});
      expenses.forEach((exp) => {
        if (exp.date && exp.category) {
          const expDate = dayjs(exp.date);
          if (
            expDate.year() === selectedYear &&
            expDate.month() === selectedMonth &&
            predefinedCategories.includes(exp.category)
          ) {
            catTotals[exp.category] += Number(exp.amount) || 0;
          }
        }
      });

      const catData = predefinedCategories.map((cat, i) => ({
        name: cat,
        amount: Number(catTotals[cat].toFixed(2)),
        color: chartColors[i % chartColors.length],
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

  const maxMonthly = Math.max(...monthlyTotals, monthlyBudget);

  return (
    <ScrollView
      contentContainerStyle={styles.statsScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.profileText, styles.statsSectionHeader]}>
        Yearly Spending ({selectedYear})
      </Text>
      <YearPicker />

      {loadingYearly ? (
        <ActivityIndicator color={colors.lightCream} size="large" />
      ) : (
        <View style={styles.chartContainer}>
          <VictoryChart
            width={screenWidth}
            domainPadding={{ x: 20 }}
            padding={styles.chartPadding}
          >
            <VictoryAxis
              tickValues={months.map((_, idx) => idx)}
              tickFormat={months}
              style={styles.axisStyle}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) =>
                t >= 1000 ? `$${(t / 1000).toFixed(1)}k` : `$${t}`
              }
              style={styles.axisStyle}
              domain={[0, Math.max(...monthlyTotals) * 1.2]}
            />
            <VictoryBar
              data={monthlyTotals.map((amt, idx) => ({ x: idx, y: amt }))}
              barRatio={0.7}
              style={styles.barStyle}
              labels={({ datum }) => `$${datum.y.toFixed(0)}`}
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
      <Text style={styles.pieBudgetLabel}>(Budget: ${maxMonthly})</Text>
      <MonthPicker />

      {loadingCategory ? (
        <ActivityIndicator color={colors.lightCream} size="large" />
      ) : categoryTotals.length === 0 ? (
        <Text style={styles.profileText}>No data for this month.</Text>
      ) : (
        <View style={styles.pieContainer}>
          <VictoryPie
            data={categoryTotals
              .filter((cat) => cat.amount > 0)
              .map((cat) => ({ x: cat.name, y: cat.amount }))}
            colorScale={categoryTotals
              .filter((cat) => cat.amount > 0)
              .map((cat) => cat.color)}
            width={pieSize}
            height={pieSize}
            labels={({ datum }) => `$${datum.y.toFixed(2)}`}
            style={styles.pieStyle}
          />

          <View style={[styles.pieLegendContainer, { width: pieSize }]}>
            {categoryTotals.map((cat) => (
              <View key={cat.name} style={styles.pieLegendItem}>
                <View
                  style={[
                    styles.pieLegendColor,
                    { backgroundColor: cat.color },
                  ]}
                />
                <Text style={styles.pieLegendText}>{cat.name}</Text>
                <Text style={styles.pieLegendText}>
                  ${cat.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
