import FormValues from '../../../types/FormValues';
import { BursarExportJobDTO } from '../types';
import aggregateCriteriaToFilterDto from './aggregateCriteriaToFilterDto';
import criteriaToFilterDto from './criteriaToFilterDto';
import dataToDto from './dataToDto';
import headerFooterToDto from './headerFooterToDto';
import transferToDto from './transferToDto';

export default function formValuesToDto(
  values: FormValues
): BursarExportJobDTO {
  if (values.aggregate) {
    return {
      filter: criteriaToFilterDto(values.criteria),
      groupByPatron: true,
      groupByPatronFilter: aggregateCriteriaToFilterDto(values.aggregateFilter),

      header: headerFooterToDto(values.header),
      data: dataToDto(values.dataAggregate),
      footer: headerFooterToDto(values.footer),
      transferInfo: transferToDto(values.transferInfo),
    };
  } else {
    return {
      filter: criteriaToFilterDto(values.criteria),
      groupByPatron: false,

      header: headerFooterToDto(values.header),
      data: dataToDto(values.data),
      footer: headerFooterToDto(values.footer),
      transferInfo: transferToDto(values.transferInfo),
    };
  }
}
