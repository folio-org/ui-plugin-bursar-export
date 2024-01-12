import { SelectOptionType } from '@folio/stripes/components';
import {
  CriteriaAggregate,
  CriteriaGroup,
  CriteriaTerminal,
} from './CriteriaTypes';
import SchedulingFrequency from './SchedulingFrequency';
import { DataToken, HeaderFooterToken } from './TokenTypes';
import { Weekday } from '../utils/WeekdayUtils';

// for coverage
export const TYPE_ONLY = true;

export default interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: string;
    time?: string;
    weekdays?: SelectOptionType<Weekday>[];
  };

  criteria?: CriteriaGroup | CriteriaTerminal;

  aggregate: boolean;
  aggregateFilter?: CriteriaAggregate;

  header?: HeaderFooterToken[];
  data?: DataToken[];
  dataAggregate?: DataToken[];
  footer?: HeaderFooterToken[];

  transferInfo?: {
    conditions?: {
      condition: CriteriaGroup | CriteriaTerminal;
      owner?: string;
      account?: string;
    }[];
    else?: {
      owner?: string;
      account?: string;
    };
  };

  buttonClicked?: 'save' | 'manual';
}
