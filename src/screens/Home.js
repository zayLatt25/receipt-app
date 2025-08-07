import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/styles";
import { auth } from "../firebase";
import FormButton from "../components/FormButton";
import dayjs from "dayjs";
import CustomCalendar from "../components/Calendar";

const HomeScreen = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // TODO: Fetch expenses from Firestore or database for the selectedDate
  const expenses = [];

  const handleLogout = () => {
    setLogoutLoading(true);
    auth.signOut();
    setLogoutLoading(false);
  };

  return (
    <View style={[styles.container, { paddingTop: 50 }]}>
      <CustomCalendar
        selectedDate={selectedDate}
        onDaySelect={(date) => setSelectedDate(date)}
      />

      {/* Thin line between calendar and expenses */}
      <View style={styles.divider} />

      {expenses.length === 0 ? (
        <Text style={styles.bodyText}>No expenses for this day.</Text>
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

      <FormButton
        title="Logout"
        onPress={handleLogout}
        loading={logoutLoading}
      />
    </View>
  );
};

export default HomeScreen;
