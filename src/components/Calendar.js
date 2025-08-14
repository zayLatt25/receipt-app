import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/CalendarStyles";

export default function CustomCalendar({
  selectedDate,
  onDaySelect,
  markedDates,
}) {
  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => onDaySelect(day.dateString)}
        current={selectedDate}
        markedDates={markedDates}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={styles.calendarTheme}
      />
    </View>
  );
}
