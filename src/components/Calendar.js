import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/CalendarStyles";
import { colors } from "../styles/theme";

export default function CustomCalendar({
  selectedDate,
  onDaySelect,
  markedDates,
}) {
  const updatedMarkedDates = {
    ...markedDates,
    [selectedDate]: {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: colors.darkPink,
      selectedTextColor: colors.lightCream,
      marked: true,
      dotColor: colors.darkPink,
    },
  };

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => onDaySelect(day.dateString)}
        current={selectedDate}
        markedDates={updatedMarkedDates}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={styles.calendarTheme}
      />
    </View>
  );
}
