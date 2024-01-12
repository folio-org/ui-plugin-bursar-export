import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import { SchedulingDTO } from '../types';
import schedulingToDto from './schedulingToDto';

describe('Scheduling conversion to DTO', () => {
  it.each<[FormValues['scheduling'], SchedulingDTO]>([
    [{ frequency: SchedulingFrequency.Manual }, { schedulePeriod: 'NONE' }],
    [
      { frequency: SchedulingFrequency.Hours, interval: '1' },
      { schedulePeriod: 'HOUR', scheduleFrequency: 1 },
    ],
    [
      {
        frequency: SchedulingFrequency.Days,
        interval: '1',
      },
      {
        schedulePeriod: 'DAY',
        scheduleFrequency: 1,
        scheduleTime: '00:00:00.000Z',
      },
    ],
    [
      {
        frequency: SchedulingFrequency.Days,
        interval: '1',
        time: '13:30:05.000Z',
      },
      {
        schedulePeriod: 'DAY',
        scheduleFrequency: 1,
        scheduleTime: '13:30:05.000Z',
      },
    ],
    [
      {
        frequency: SchedulingFrequency.Weeks,
        interval: '1',
      },
      {
        schedulePeriod: 'WEEK',
        scheduleFrequency: 1,
        scheduleTime: '00:00:00.000Z',
        weekDays: [],
      },
    ],
    [
      {
        frequency: SchedulingFrequency.Weeks,
        interval: '1',
        time: '12:27:58.000Z',
        weekdays: [
          {
            label: 'Monday',
            value: 'MONDAY',
          },
          {
            label: 'Thursday',
            value: 'THURSDAY',
          },
        ],
      },
      {
        schedulePeriod: 'WEEK',
        scheduleFrequency: 1,
        scheduleTime: '12:27:58.000Z',
        weekDays: ['MONDAY', 'THURSDAY'],
      },
    ],
  ])('converts %s to %s', (input, expected) =>
    expect(schedulingToDto(input)).toEqual(expected)
  );
});
