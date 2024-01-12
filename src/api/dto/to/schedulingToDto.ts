import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import { guardNumberPositive } from '../../../utils/guardNumber';
import { SchedulingDTO } from '../types';

export default function schedulingToDto(
  values: FormValues['scheduling']
): SchedulingDTO {
  switch (values.frequency) {
    case SchedulingFrequency.Manual:
      return { schedulePeriod: 'NONE' };
    case SchedulingFrequency.Hours:
      return {
        schedulePeriod: 'HOUR',
        scheduleFrequency: guardNumberPositive(values.interval),
      };
    case SchedulingFrequency.Days:
      return {
        schedulePeriod: 'DAY',
        scheduleFrequency: guardNumberPositive(values.interval),
        scheduleTime: values.time ?? '00:00:00.000Z',
      };
    case SchedulingFrequency.Weeks:
    default:
      return {
        schedulePeriod: 'WEEK',
        scheduleFrequency: guardNumberPositive(values.interval),
        scheduleTime: values.time ?? '00:00:00.000Z',
        weekDays: values.weekdays?.map(({ value }) => value) ?? [],
      };
  }
}
