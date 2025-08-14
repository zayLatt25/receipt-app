import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/CalendarStyles";
import { colors } from "../styles/theme";

export default function CustomCalendar({
  selectedDate,
  onDaySelect,
  markedDates,
  onMonthChange,
}) {
  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => onDaySelect(day.dateString)}
        current={selectedDate}
        markedDates={markedDates}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          ...styles.calendarTheme,
          dotStyle: { marginTop: -2 },
          arrowColor: colors.darkPink,
          monthTextColor: colors.darkPink,
          textDayFontWeight: "500",
          textMonthFontWeight: "600",
        }}
        onMonthChange={(month) => onMonthChange?.(month.dateString)}
      />
    </View>
  );
}
