// components/Calendar.js
import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles, darkPink } from "../styles/styles";

export default function CustomCalendar({ selectedDate, onDaySelect }) {
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: darkPink,
      selectedTextColor: "#fff",
    },
  };

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => onDaySelect(day.dateString)}
        markedDates={markedDates}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={styles.calendarTheme}
      />
    </View>
  );
}
