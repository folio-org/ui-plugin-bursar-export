import { IntlShape } from 'react-intl';
import { StripesType } from '@folio/stripes/core';
import FormValues from '../../../types/FormValues';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { SavedJobConfiguration } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';
import dtoToCriteria from './dtoToCriteria';
import dtoToData from './dtoToData';
import dtoToHeaderFooter from './dtoToHeaderFooter';
import dtoToScheduling from './dtoToScheduling';
import dtoToTransfer from './dtoToTransfer';

export default function dtoToFormValues(
  values: SavedJobConfiguration | null | undefined,
  localeWeekdays: LocaleWeekdayInfo[],
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  transferAccounts: TransferAccountDTO[],
  stripes: StripesType,
  intl: IntlShape,
): Partial<FormValues> {
  if (!values) {
    return {};
  }

  if (values.exportTypeSpecificParameters.bursarFeeFines.groupByPatron) {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(values.exportTypeSpecificParameters.bursarFeeFines.filter, feeFineTypes, locations, stripes, intl),

      aggregate: true,
      aggregateFilter: dtoToAggregateCriteria(values.exportTypeSpecificParameters.bursarFeeFines.groupByPatronFilter, stripes, intl),

      header: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.header),
      dataAggregate: dtoToData(values.exportTypeSpecificParameters.bursarFeeFines.data, feeFineTypes, locations, stripes, intl),
      footer: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.header),

      transferInfo: dtoToTransfer(
        values.exportTypeSpecificParameters.bursarFeeFines.transferInfo,
        feeFineTypes,
        locations,
        transferAccounts,
        stripes,
        intl,
      ),
    };
  } else {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(values.exportTypeSpecificParameters.bursarFeeFines.filter, feeFineTypes, locations, stripes, intl),

      aggregate: false,

      header: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.header),
      data: dtoToData(values.exportTypeSpecificParameters.bursarFeeFines.data, feeFineTypes, locations, stripes, intl),
      footer: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.header),

      transferInfo: dtoToTransfer(
        values.exportTypeSpecificParameters.bursarFeeFines.transferInfo,
        feeFineTypes,
        locations,
        transferAccounts,
        stripes,
        intl,
      ),
    };
  }
}
