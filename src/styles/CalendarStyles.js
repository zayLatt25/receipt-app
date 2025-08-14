import { StyleSheet } from "react-native";
import { colors } from "./theme";
import { scale, verticalScale, normalizeFont } from "../utils/sizes";

export const styles = StyleSheet.create({
  calendarWrapper: {
    backgroundColor: colors.navyBlue,
    marginBottom: verticalScale(10),
  },
  calendarTheme: {
    backgroundColor: colors.navyBlue,
    calendarBackground: colors.navyBlue,
    dayTextColor: colors.lightCream,
    monthTextColor: colors.lightCream,
    textSectionTitleColor: colors.lightCream,
    selectedDayTextColor: colors.lightCream,
    todayTextColor: colors.lightCream,
    arrowColor: colors.lightCream,

    textDayFontSize: normalizeFont(17),
    textMonthFontSize: normalizeFont(17),
    textDayHeaderFontSize: normalizeFont(14),
  },
});
