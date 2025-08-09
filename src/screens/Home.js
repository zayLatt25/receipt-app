import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import dayjs from "dayjs";
import CustomCalendar from "../components/Calendar";
import FloatingActionButton from "../components/FloatingActionButton";
import AddExpenseModal from "../components/AddExpenseModal";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import ExpenseList from "../components/ExpenseList";

const HomeScreen = () => {
  const { user, authLoading } = useAuth();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (authLoading) return; // wait until auth is loaded
    if (!user) {
      setExpenses([]); // clear if logged out
      return;
    }
    fetchExpenses(selectedDate);
  }, [selectedDate, authLoading, user]);

  const handleAddExpense = async (expense) => {
    if (!user) return;
    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "expenses"),
        expense
      );

      setExpenses((prev) => [...prev, { id: docRef.id, ...expense }]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomCalendar
        selectedDate={selectedDate}
        onDaySelect={setSelectedDate}
      />

      <View style={styles.divider} />

      {expenses.length === 0 ? (
        <Text style={styles.bodyText}>No expenses for this day!</Text>
      ) : (
        <ExpenseList expenses={expenses} />
      )}

      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddExpense}
        initialDate={selectedDate}
      />
    </View>
  );
};

export default HomeScreen;
