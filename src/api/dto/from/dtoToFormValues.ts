import FormValues from '../../../types/FormValues';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { SavedJobDTO } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';
import dtoToCriteria from './dtoToCriteria';
import dtoToData from './dtoToData';
import dtoToHeaderFooter from './dtoToHeaderFooter';
import dtoToScheduling from './dtoToScheduling';
import dtoToTransfer from './dtoToTransfer';

export default function dtoToFormValues(
  values: SavedJobDTO | null | undefined,
  localeWeekdays: LocaleWeekdayInfo[],
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  transferAccounts: TransferAccountDTO[]
): Partial<FormValues> {
  if (!values) {
    return {};
  }

  if (values.exportTypeSpecificParameters.bursarFeeFines.groupByPatron) {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.filter,
        feeFineTypes,
        locations
      ),

      aggregate: true,
      aggregateFilter: dtoToAggregateCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.groupByPatronFilter
      ),

      header: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
      dataAggregate: dtoToData(
        values.exportTypeSpecificParameters.bursarFeeFines.data,
        feeFineTypes,
        locations
      ),
      footer: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),

      transferInfo: dtoToTransfer(
        values.exportTypeSpecificParameters.bursarFeeFines.transferInfo,
        feeFineTypes,
        locations,
        transferAccounts
      ),
    };
  } else {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.filter,
        feeFineTypes,
        locations
      ),

      aggregate: false,

      header: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
      data: dtoToData(
        values.exportTypeSpecificParameters.bursarFeeFines.data,
        feeFineTypes,
        locations
      ),
      footer: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),

      transferInfo: dtoToTransfer(
        values.exportTypeSpecificParameters.bursarFeeFines.transferInfo,
        feeFineTypes,
        locations,
        transferAccounts
      ),
    };
  }
}
