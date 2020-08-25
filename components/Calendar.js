import * as React from "react";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import constants from "../constants";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';

export default ({ horizontal=false, calendarWidth=constants.width}) => {
  return (
    <CalendarList 
    theme={{
      textMonthFontSize:20,
      textDayHeaderFontSize: 16,
    }}
    hideArrows={true}
    monthFormat={`${'yyyy년'}  ${'MM월'}`}
    minDate={'2020-08-17'}
    maxDate={'2020-12-31'} 
    pastScrollRange={4}
    futureScrollRange={5}
    calendarWidth={calendarWidth}
    horizontal={horizontal}
    pagingEnabled={false}
    calendarHeight={400}
    onDayPress={(e) => console.log(e)}
    dayComponent={ <dayComponent />}
    />
)};