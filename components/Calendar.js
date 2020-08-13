import * as React from "react";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import constants from "../constants";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';

export default ({ calendarWidth=constants.width, }) => (
  <CalendarList 
     theme={{
       textMonthFontSize:20,
       textDayHeaderFontSize: 16
     }}
     pagingEnabled={true}
     horizontal={true}
     minDate={'2020-05-01'}
     maxDate={'2020-12-31'} 
     pastScrollRange={4}
     futureScrollRange={5}
     markedDates={{
       '2020-08-3':{selected:true, }
     }}
     calendarWidth={calendarWidth}
     scrollEnabled={false}
     pagingEnabled={false}
     />
);