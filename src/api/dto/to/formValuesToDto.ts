import { FormValues } from '../../../types';
import { BursarExportJobDTO } from '../dto-types';
import aggregateCriteriaToFilterDto from './aggregateCriteriaToFilterDto';
import criteriaToFilterDto from './criteriaToFilterDto';
import dataToDto from './dataToDto';
import headerFooterToDto from './headerFooterToDto';
import transferToDto from './transferToDto';

export default function formValuesToDto(values: FormValues): BursarExportJobDTO {
  const common = {
    filter: criteriaToFilterDto(values.criteria),

    header: headerFooterToDto(values.header),
    footer: headerFooterToDto(values.footer),

    dryRun: values.dryRun === true,
    transferInfo: transferToDto(values.transferInfo),
  };
  if (values.aggregate) {
    return {
      ...common,
      groupByPatron: true,
      groupByPatronFilter: aggregateCriteriaToFilterDto(values.aggregateFilter),

      data: dataToDto(values.dataAggregate),
    };
  } else {
    return {
      ...common,
      groupByPatron: false,

      header: headerFooterToDto(values.header),
      data: dataToDto(values.data),
    };
  }
}
