import * as  dayjs from 'dayjs';
import { InfoCount } from './types';

export function convertArrayToRecord(arr: string[]): InfoCount {
  return arr.reduce((result: Record<string, number>, str: string) => {
    result[str] = str.length;
    return result;
  }, {});
}

export function getActiveHoursAndDates(dateStrings: Date[]): {
  activeHours: InfoCount;
  activeDates: InfoCount;
} {
  const activeHours: Record<number, number> = {};
  const activeDates: Record<number, number> = {};

  dateStrings.forEach((dateString) => {
    const date =  dayjs(dateString);
    const hour = date.format('h A');
    const formatedDate = date.format('YYYY-MM-DD');

    activeHours[hour] = (activeHours[hour] || 0) + 1;
    activeDates[formatedDate] = (activeDates[formatedDate] || 0) + 1;
  });

  return { activeHours, activeDates };
}
