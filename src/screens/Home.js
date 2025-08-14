import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";

import CustomCalendar from "../components/Calendar";
import FloatingActionButton from "../components/FloatingActionButton";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseList from "../components/ExpenseList";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { homeStyles as styles } from "../styles/HomeScreenStyles";
import { colors } from "../styles/theme";

const HomeScreen = () => {
  const { user, authLoading } = useAuth();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [expenses, setExpenses] = useState([]);
  const [monthlyExpensesCache, setMonthlyExpensesCache] = useState({}); // Cache per month
  const [modalVisible, setModalVisible] = useState(false);

  const currentMonthKey = dayjs(selectedDate).format("YYYY-MM");

  // Fetch daily expenses
  const fetchExpenses = async (date) => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "users", user.uid, "expenses"),
        where("date", "==", date)
      );
      const snapshot = await getDocs(q);
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching daily expenses:", error);
    }
  };

  // Fetch monthly expenses only if not cached
  const fetchMonthlyExpenses = async (monthKey, forceRefresh = false) => {
    if (!user) return;
    if (!forceRefresh && monthlyExpensesCache[monthKey]) return;

    try {
      const startOfMonth = dayjs(monthKey + "-01")
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = dayjs(monthKey + "-01")
        .endOf("month")
        .format("YYYY-MM-DD");

      const q = query(
        collection(db, "users", user.uid, "expenses"),
        where("date", ">=", startOfMonth),
        where("date", "<=", endOfMonth)
      );

      const snapshot = await getDocs(q);
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMonthlyExpensesCache((prev) => ({
        ...prev,
        [monthKey]: expensesData,
      }));
    } catch (error) {
      console.error("Error fetching monthly expenses:", error);
    }
  };

  // Refresh both daily and monthly expenses
  const refreshExpenses = async (
    date = selectedDate,
    forceMonthRefresh = false
  ) => {
    await fetchExpenses(date);
    const monthKey = dayjs(date).format("YYYY-MM");
    await fetchMonthlyExpenses(monthKey, forceMonthRefresh);
  };

  // Add expense
  const handleAddExpense = async (expense) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "expenses"), expense);
      setModalVisible(false);
      // Force refresh month so dot appears immediately
      await refreshExpenses(selectedDate, true);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // delete expense
  const handleDeleteExpense = async (expenseId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "expenses", expenseId));
      // Refresh daily expenses and force refresh month to update calendar dots
      await refreshExpenses(selectedDate, true);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Load data when auth or selectedDate changes
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setExpenses([]);
      setMonthlyExpensesCache({});
      return;
    }
    refreshExpenses(selectedDate);
  }, [selectedDate, authLoading, user]);

  // Prepare marked dates
  const markedDates = useMemo(() => {
    const monthExpenses = monthlyExpensesCache[currentMonthKey] || [];
    const datesWithExpenses = {};

    monthExpenses.forEach((exp) => {
      datesWithExpenses[exp.date] = {
        marked: true,
        dotColor: "#ff69b4",
        dotStyle: { width: 5, height: 5, marginTop: 2 }, // smaller and centered
      };
    });

    if (datesWithExpenses[selectedDate]) {
      // Selected day with expenses
      datesWithExpenses[selectedDate] = {
        ...datesWithExpenses[selectedDate],
        selected: true,
        selectedColor: "#ff69b4",
        selectedTextColor: "#fff",
        dotColor: colors.lightCream,
        dotStyle: { width: 5, height: 5, marginTop: 2 }, // ensure dot inside circle
      };
    } else {
      // Selected day without expenses
      datesWithExpenses[selectedDate] = {
        selected: true,
        selectedColor: "#ff69b4",
        selectedTextColor: "#fff",
      };
    }

    return datesWithExpenses;
  }, [monthlyExpensesCache, selectedDate, currentMonthKey]);

  // Handle month change in calendar
  const handleMonthChange = async (monthDateString) => {
    const monthKey = dayjs(monthDateString + "-01").format("YYYY-MM");
    await fetchMonthlyExpenses(monthKey);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeAreaView}>
      <View style={styles.container}>
        <CustomCalendar
          selectedDate={selectedDate}
          onDaySelect={setSelectedDate}
          markedDates={markedDates}
          onMonthChange={handleMonthChange}
        />

        <View style={styles.divider} />

        {expenses.length === 0 ? (
          <Text style={styles.bodyText}>No expenses for this day!</Text>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        <FloatingActionButton onPress={() => setModalVisible(true)} />

        <AddExpenseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleAddExpense}
          initialDate={selectedDate}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
