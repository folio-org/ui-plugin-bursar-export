import { IntlShape } from 'react-intl';
import { useMemo } from 'react';
import { LocaleWeekdayInfo, getLocaleWeekdays } from '../utils/WeekdayUtils';

export default function useLocaleWeekdays(intl: IntlShape): LocaleWeekdayInfo[] {
  return useMemo(() => getLocaleWeekdays(intl), [intl]);
}
