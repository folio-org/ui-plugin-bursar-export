import { StripesType } from '@folio/stripes/core';
import { IntlShape } from 'react-intl';
import { FormValues } from '../../../types';
import { LocaleWeekdayInfo } from '../../../utils/weekdayUtils';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { SavedJobConfiguration } from '../dto-types';
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

  const commonValues = {
    scheduling: dtoToScheduling(values, localeWeekdays),

    criteria: dtoToCriteria(
      values.exportTypeSpecificParameters.bursarFeeFines.filter,
      feeFineTypes,
      locations,
      stripes,
      intl,
    ),

    header: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.header),
    footer: dtoToHeaderFooter(values.exportTypeSpecificParameters.bursarFeeFines.footer),

    transferInfo: dtoToTransfer(
      values.exportTypeSpecificParameters.bursarFeeFines.transferInfo,
      feeFineTypes,
      locations,
      transferAccounts,
      stripes,
      intl,
    ),

    dryRun: values.exportTypeSpecificParameters.bursarFeeFines.dryRun === true,
  };

  if (values.exportTypeSpecificParameters.bursarFeeFines.groupByPatron) {
    return {
      ...commonValues,

      aggregate: true,
      aggregateFilter: dtoToAggregateCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.groupByPatronFilter,
        stripes,
        intl,
      ),

      dataAggregate: dtoToData(
        values.exportTypeSpecificParameters.bursarFeeFines.data,
        feeFineTypes,
        locations,
        stripes,
        intl,
      ),
    };
  } else {
    return {
      ...commonValues,

      aggregate: false,

      data: dtoToData(
        values.exportTypeSpecificParameters.bursarFeeFines.data,
        feeFineTypes,
        locations,
        stripes,
        intl,
      ),
    };
  }
}
