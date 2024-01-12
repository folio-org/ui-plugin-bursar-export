import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';
import { SchedulingDTO } from '../types';

export function frequencyToString(
  freq: number | undefined
): string | undefined {
  return freq?.toString();
}

export default function dtoToScheduling(
  values: SchedulingDTO,
  localeWeekdays: LocaleWeekdayInfo[]
): FormValues['scheduling'] {
  switch (values.schedulePeriod) {
    case 'HOUR':
      return {
        frequency: SchedulingFrequency.Hours,
        interval: frequencyToString(values.scheduleFrequency),
      };
    case 'DAY':
      return {
        frequency: SchedulingFrequency.Days,
        interval: frequencyToString(values.scheduleFrequency),
        time: values.scheduleTime,
      };
    case 'WEEK':
      return {
        frequency: SchedulingFrequency.Weeks,
        interval: frequencyToString(values.scheduleFrequency),
        time: values.scheduleTime,
        weekdays: values.weekDays?.map((day) => ({
          label:
            localeWeekdays.find((weekday) => weekday.weekday === day)?.long ??
            day, // should not happen
          value: day,
        })),
      };
    case 'NONE':
    default:
      return { frequency: SchedulingFrequency.Manual };
  }
}
