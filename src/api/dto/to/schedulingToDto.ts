import { FormValues, SchedulingFrequency } from '../../../types';
import { guardNumberPositive } from '../../../utils/guardNumber';
import { SchedulingDTO } from '../dto-types';

export default function schedulingToDto(values: FormValues['scheduling']): SchedulingDTO {
  switch (values.frequency) {
    case SchedulingFrequency.Manual:
      return { schedulePeriod: SchedulingFrequency.Manual };
    case SchedulingFrequency.Hours:
      return {
        schedulePeriod: SchedulingFrequency.Hours,
        scheduleFrequency: guardNumberPositive(values.interval),
      };
    case SchedulingFrequency.Days:
      return {
        schedulePeriod: SchedulingFrequency.Days,
        scheduleFrequency: guardNumberPositive(values.interval),
        scheduleTime: values.time ?? '00:00:00.000Z',
      };
    case SchedulingFrequency.Weeks:
    default:
      return {
        schedulePeriod: SchedulingFrequency.Weeks,
        scheduleFrequency: guardNumberPositive(values.interval),
        scheduleTime: values.time ?? '00:00:00.000Z',
        weekDays: values.weekdays?.map(({ value }) => value) ?? [],
      };
  }
}
