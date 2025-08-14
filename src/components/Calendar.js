// components/Calendar.js
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/CalendarStyles";
import { colors } from "../styles/theme";

export default function CustomCalendar({ selectedDate, onDaySelect }) {
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: colors.darkPink,
      selectedTextColor: colors.lightCream,
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
