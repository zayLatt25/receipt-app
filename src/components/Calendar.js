// components/CalendarView.js
import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles, navyBlue, lightCream, darkPink } from "../styles/styles";

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
        theme={{
          backgroundColor: navyBlue,
          calendarBackground: navyBlue,
          dayTextColor: lightCream,
          monthTextColor: lightCream,
          textSectionTitleColor: lightCream,
          selectedDayTextColor: "#fff",
          todayTextColor: lightCream,
          arrowColor: lightCream,

          textDayFontSize: 17,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />
    </View>
  );
}
