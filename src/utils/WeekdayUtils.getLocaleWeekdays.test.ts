import { renderHook } from '@testing-library/react';
import { IntlShape } from 'react-intl';
import * as Weekdays from '../test/data/Weekdays';
import getIntl from '../test/util/getIntl';
import { getLocaleWeekdays, useLocaleWeekdays } from './WeekdayUtils';

// United States
let intlEn: IntlShape;
// France
let intlFr: IntlShape;
// Algeria
let intlAr: IntlShape;

beforeAll(() => {
  intlEn = getIntl('en-US', 'EST');
  intlFr = getIntl('fr-FR', 'CET');
  intlAr = getIntl('ar-DZ', 'CET');
});

test('Locale weekdays are properly retrieved', () => {
  expect(getLocaleWeekdays(intlEn)).toStrictEqual([
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
  ]);
  expect(getLocaleWeekdays(intlFr)).toStrictEqual([
    { weekday: Weekdays.Monday, long: 'lundi', short: 'lun.', narrow: 'L' },
    { weekday: Weekdays.Tuesday, long: 'mardi', short: 'mar.', narrow: 'M' },
    {
      weekday: Weekdays.Wednesday,
      long: 'mercredi',
      short: 'mer.',
      narrow: 'M',
    },
    { weekday: Weekdays.Thursday, long: 'jeudi', short: 'jeu.', narrow: 'J' },
    { weekday: Weekdays.Friday, long: 'vendredi', short: 'ven.', narrow: 'V' },
    { weekday: Weekdays.Saturday, long: 'samedi', short: 'sam.', narrow: 'S' },
    { weekday: Weekdays.Sunday, long: 'dimanche', short: 'dim.', narrow: 'D' },
  ]);
  expect(getLocaleWeekdays(intlAr)).toStrictEqual([
    { weekday: Weekdays.Saturday, long: 'السبت', short: 'السبت', narrow: 'س' },
    { weekday: Weekdays.Sunday, long: 'الأحد', short: 'الأحد', narrow: 'ح' },
    {
      weekday: Weekdays.Monday,
      long: 'الاثنين',
      short: 'الاثنين',
      narrow: 'ن',
    },
    {
      weekday: Weekdays.Tuesday,
      long: 'الثلاثاء',
      short: 'الثلاثاء',
      narrow: 'ث',
    },
    {
      weekday: Weekdays.Wednesday,
      long: 'الأربعاء',
      short: 'الأربعاء',
      narrow: 'ر',
    },
    {
      weekday: Weekdays.Thursday,
      long: 'الخميس',
      short: 'الخميس',
      narrow: 'خ',
    },
    { weekday: Weekdays.Friday, long: 'الجمعة', short: 'الجمعة', narrow: 'ج' },
  ]);
});

test('useLocaleWeekdays hook works like getLocaleWeekdays', () => {
  let intlToTest = intlEn;
  const { result, rerender } = renderHook(() => useLocaleWeekdays(intlToTest));

  intlToTest = intlEn;
  rerender();
  expect(result.current).toStrictEqual([
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
  ]);

  intlToTest = intlFr;
  rerender();
  expect(result.current).toStrictEqual([
    { weekday: Weekdays.Monday, long: 'lundi', short: 'lun.', narrow: 'L' },
    { weekday: Weekdays.Tuesday, long: 'mardi', short: 'mar.', narrow: 'M' },
    {
      weekday: Weekdays.Wednesday,
      long: 'mercredi',
      short: 'mer.',
      narrow: 'M',
    },
    { weekday: Weekdays.Thursday, long: 'jeudi', short: 'jeu.', narrow: 'J' },
    { weekday: Weekdays.Friday, long: 'vendredi', short: 'ven.', narrow: 'V' },
    { weekday: Weekdays.Saturday, long: 'samedi', short: 'sam.', narrow: 'S' },
    { weekday: Weekdays.Sunday, long: 'dimanche', short: 'dim.', narrow: 'D' },
  ]);

  intlToTest = intlAr;
  rerender();
  expect(result.current).toStrictEqual([
    { weekday: Weekdays.Saturday, long: 'السبت', short: 'السبت', narrow: 'س' },
    { weekday: Weekdays.Sunday, long: 'الأحد', short: 'الأحد', narrow: 'ح' },
    {
      weekday: Weekdays.Monday,
      long: 'الاثنين',
      short: 'الاثنين',
      narrow: 'ن',
    },
    {
      weekday: Weekdays.Tuesday,
      long: 'الثلاثاء',
      short: 'الثلاثاء',
      narrow: 'ث',
    },
    {
      weekday: Weekdays.Wednesday,
      long: 'الأربعاء',
      short: 'الأربعاء',
      narrow: 'ر',
    },
    {
      weekday: Weekdays.Thursday,
      long: 'الخميس',
      short: 'الخميس',
      narrow: 'خ',
    },
    { weekday: Weekdays.Friday, long: 'الجمعة', short: 'الجمعة', narrow: 'ج' },
  ]);
});
