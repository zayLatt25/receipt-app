import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/styles";
import dayjs from "dayjs";
import CustomCalendar from "../components/Calendar";
import FloatingActionButton from "../components/FloatingActionButton";
import AddExpenseModal from "../components/AddExpenseModal";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <CustomCalendar
        selectedDate={selectedDate}
        onDaySelect={setSelectedDate}
      />

      <View style={styles.divider} />

      {expenses.length === 0 ? (
        <Text style={styles.bodyText}>No expenses for this day!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.description}</Text>
              <Text style={styles.expenseText}>${item.amount.toFixed(2)}</Text>
            </View>
          )}
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
  );
};

export default HomeScreen;
