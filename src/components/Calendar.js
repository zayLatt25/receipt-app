import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles/CalendarStyles";
import { normalizeFont, moderateScale } from "../utils/sizes";

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
          // Responsive sizes
          textDayFontSize: normalizeFont(16),
          textMonthFontSize: normalizeFont(18),
          textDayFontWeight: "500",
          textMonthFontWeight: "600",
          dotStyle: {
            width: moderateScale(5),
            height: moderateScale(5),
            marginTop: -1,
            borderRadius: moderateScale(2.5),
          },
        }}
        onMonthChange={(month) => onMonthChange?.(month.dateString)}
      />
    </View>
  );
}
