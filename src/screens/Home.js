import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/styles";
import dayjs from "dayjs";
import CustomCalendar from "../components/Calendar";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // TODO: Fetch expenses from Firestore or database for the selectedDate
  const expenses = [];

  return (
    <View style={[styles.container]}>
      <CustomCalendar
        selectedDate={selectedDate}
        onDaySelect={(date) => setSelectedDate(date)}
      />

      {/* Thin line between calendar and expenses */}
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
    </View>
  );
};

export default HomeScreen;
