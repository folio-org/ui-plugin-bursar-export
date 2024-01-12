import { staticFirstWeekDay } from '@folio/stripes/components';
import { useMemo } from 'react';
import { IntlShape } from 'react-intl';

export type Weekday =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

/**
 * Used for algorithmically relating weekdays to each other.  This MUST not be
 * used for any type of user display, only for relating weekdays to each other.
 * The only guarantees are that weekdays (when wrapped around) will be in the
 * typical order, such as Friday -> Saturday, and that .getDay() on Date will
 * correspond here as expected.
 * Additionally, the values here will correspond to {@link WEEKDAY_INDEX}
 */
export const WEEKDAYS: Record<Weekday, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};
/**
 * Used for algorithmically relating weekdays to each other.  This MUST not be
 * used for any type of user display, only for relating weekdays to each other.
 * The only guarantees are that weekdays (when wrapped around) will be in the
 * typical order, such as Friday -> Saturday, and that .getDay() on Date will
 * correspond here as expected.
 * Additionally, the values here will correspond to {@link WEEKDAY_INDEX}
 */
export const WEEKDAY_INDEX: Weekday[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export interface LocaleWeekdayInfo {
  weekday: Weekday;
  narrow: string;
  short: string;
  long: string;
}

export function getFirstDayOfWeek(locale: string) {
  const region = locale.split('-')[1]?.toUpperCase() ?? 'US';
  const weekdayLookup = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };
  for (const [weekday, regions] of Object.entries(staticFirstWeekDay)) {
    if (regions.includes(region)) {
      return weekdayLookup[weekday as keyof typeof staticFirstWeekDay];
    }
  }
  return 0; // safe default
}

/** Get information for the days of the week, for the current locale */
export function getLocaleWeekdays(intl: IntlShape): LocaleWeekdayInfo[] {
  const firstDay = getFirstDayOfWeek(intl.locale);

  const weekdays: LocaleWeekdayInfo[] = [];
  for (let i = 0; i < 7; i++) {
    // need to be careful to use UTC here, and force react-intl to use UTC
    // since this is the one date-formatted thing that will be visible to users
    const day = new Date(Date.UTC(2000, 1, 1));
    day.setUTCDate(day.getUTCDate() - day.getUTCDay() + firstDay + i);
    weekdays.push({
      weekday: WEEKDAY_INDEX[(firstDay + i) % 7],
      narrow: intl.formatDate(day, { weekday: 'narrow', timeZone: 'UTC' }),
      short: intl.formatDate(day, { weekday: 'short', timeZone: 'UTC' }),
      long: intl.formatDate(day, { weekday: 'long', timeZone: 'UTC' }),
    });
  }
  return weekdays;
}

export function useLocaleWeekdays(intl: IntlShape): LocaleWeekdayInfo[] {
  return useMemo(() => getLocaleWeekdays(intl), [intl]);
}
