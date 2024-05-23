import { SelectOptionType } from '@folio/stripes/components';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { CriteriaGroupType, CriteriaTerminalType } from '../types';

export default function useCriteriaCardOptions(root: boolean, patronOnly: boolean) {
  const intl = useIntl();

  return useMemo(() => {
    const options: SelectOptionType<CriteriaGroupType | CriteriaTerminalType>[] = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Condition-AND',
        }),
        value: CriteriaGroupType.ALL_OF,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Condition-OR',
        }),
        value: CriteriaGroupType.ANY_OF,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Condition-NOR',
        }),
        value: CriteriaGroupType.NONE_OF,
      },

      {
        label: '',
        value: CriteriaTerminalType.PASS,
        disabled: true,
      },

      ...(patronOnly
        ? [
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.PatronGroup',
            }),
            value: CriteriaTerminalType.PATRON_GROUP,
          },
        ] : [
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Age',
            }),
            value: CriteriaTerminalType.AGE,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Amount',
            }),
            value: CriteriaTerminalType.AMOUNT,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.FeeFineOwner',
            }),
            value: CriteriaTerminalType.FEE_FINE_OWNER,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.FeeType',
            }),
            value: CriteriaTerminalType.FEE_FINE_TYPE,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Location',
            }),
            value: CriteriaTerminalType.LOCATION,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.ServicePoint',
            }),
            value: CriteriaTerminalType.SERVICE_POINT,
          },
          {
            label: intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.criteria.select.PatronGroup',
            }),
            value: CriteriaTerminalType.PATRON_GROUP,
          },
        ]
      ).sort((a, b) => a.label.localeCompare(b.label)),
    ];

    if (root) {
      options.unshift({
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.Pass',
        }),
        value: CriteriaTerminalType.PASS,
      });
    }

    return options;
  }, [intl, patronOnly, root]);
}
