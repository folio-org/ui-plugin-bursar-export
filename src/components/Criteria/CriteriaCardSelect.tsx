import { Select, SelectOptionType } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../types/CriteriaTypes';
import { useIntl } from 'react-intl';

export default function CriteriaCardSelect({
  name,
  root = false,
  patronOnly = false,
}: {
  name: string;
  root?: boolean;
  patronOnly?: boolean;
}) {
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaTerminalType.PASS;
    } else {
      return CriteriaGroupType.ALL_OF;
    }
  }, [root]);

  const intl = useIntl();

  const selectOptions = useMemo(() => {
    const options: SelectOptionType<
      CriteriaGroupType | CriteriaTerminalType
    >[] = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.allOf',
        }),
        value: CriteriaGroupType.ALL_OF,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.anyOf',
        }),
        value: CriteriaGroupType.ANY_OF,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.noneOf',
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
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.patronGroup',
              }),
              value: CriteriaTerminalType.PATRON_GROUP,
            },
          ]
        : [
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.age',
              }),
              value: CriteriaTerminalType.AGE,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.amount',
              }),
              value: CriteriaTerminalType.AMOUNT,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.owner',
              }),
              value: CriteriaTerminalType.FEE_FINE_OWNER,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.type',
              }),
              value: CriteriaTerminalType.FEE_FINE_TYPE,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.location',
              }),
              value: CriteriaTerminalType.LOCATION,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.servicePoint',
              }),
              value: CriteriaTerminalType.SERVICE_POINT,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.criteria.select.patronGroup',
              }),
              value: CriteriaTerminalType.PATRON_GROUP,
            },
          ]
      ).sort((a, b) => a.label.localeCompare(b.label)),
    ];

    if (root) {
      options.unshift({
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.criteria.select.none',
        }),
        value: CriteriaTerminalType.PASS,
      });
    }

    return options;
  }, [root, patronOnly]);

  return (
    <Field
      name={name}
      defaultValue={selectDefaultValue}
      aria-label={intl.formatMessage({
        id: 'ui-plugin-bursar-export.bursarExports.criteria.select.label',
      })}
    >
      {(fieldProps) => (
        <Select<CriteriaGroupType | CriteriaTerminalType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
