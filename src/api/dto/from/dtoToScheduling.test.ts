import * as Weekdays from '../../../test/data/Weekdays';
import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import { SchedulingDTO } from '../types';
import dtoToScheduling from './dtoToScheduling';

const LOCALE_WEEKDAYS = [
  { weekday: Weekdays.Sunday, long: 'Sunday', short: 'Sun', narrow: 'S' },
  { weekday: Weekdays.Monday, long: 'Monday', short: 'Mon', narrow: 'M' },
  { weekday: Weekdays.Tuesday, long: 'Tuesday', short: 'Tue', narrow: 'T' },
  {
    weekday: Weekdays.Wednesday,
    long: 'Wednesday',
    short: 'Wed',
    narrow: 'W',
  },
  { weekday: Weekdays.Thursday, long: 'Thursday', short: 'Thu', narrow: 'T' },
  { weekday: Weekdays.Friday, long: 'Friday', short: 'Fri', narrow: 'F' },
  { weekday: Weekdays.Saturday, long: 'Saturday', short: 'Sat', narrow: 'S' },
];

test.each<[SchedulingDTO, FormValues['scheduling']]>([
  [{ schedulePeriod: 'NONE' }, { frequency: SchedulingFrequency.Manual }],
  [{ schedulePeriod: 'HOUR' }, { frequency: SchedulingFrequency.Hours }],
  [
    { schedulePeriod: 'HOUR', scheduleFrequency: 2 },
    { frequency: SchedulingFrequency.Hours, interval: '2' },
  ],
  [
    {
      schedulePeriod: 'DAY',
      scheduleFrequency: 3,
      scheduleTime: '09:00:00.000Z',
    },
    {
      frequency: SchedulingFrequency.Days,
      interval: '3',
      time: '09:00:00.000Z',
    },
  ],
  [
    {
      schedulePeriod: 'WEEK',
      scheduleFrequency: 4,
      scheduleTime: '09:45:00.000Z',
    },
    {
      frequency: SchedulingFrequency.Weeks,
      interval: '4',
      time: '09:45:00.000Z',
    },
  ],
  [
    {
      schedulePeriod: 'WEEK',
      scheduleFrequency: 4,
      scheduleTime: '09:45:00.000Z',
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY', 'not-real' as any],
    },
    {
      frequency: SchedulingFrequency.Weeks,
      interval: '4',
      time: '09:45:00.000Z',
      weekdays: [
        {
          label: 'Monday',
          value: 'MONDAY',
        },
        {
          label: 'Wednesday',
          value: 'WEDNESDAY',
        },
        {
          label: 'Friday',
          value: 'FRIDAY',
        },
        {
          label: 'not-real',
          value: 'not-real' as any,
        },
      ],
    },
  ],
])('Converts scheduling DTO %s to %s', (input, expected) =>
  expect(dtoToScheduling(input, LOCALE_WEEKDAYS)).toEqual(expected)
);
