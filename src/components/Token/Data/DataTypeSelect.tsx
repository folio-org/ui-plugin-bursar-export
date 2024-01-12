import { Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import { useIntl } from 'react-intl';

export default function DataTypeSelect({ name }: { name: string }) {
  const isAggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const intl = useIntl();

  const alwaysAvailableOptions = useMemo(() => {
    const topOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.newline',
        }),
        value: DataTokenType.NEWLINE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.newlineMicrosoft',
        }),
        value: DataTokenType.NEWLINE_MICROSOFT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.tab',
        }),
        value: DataTokenType.TAB,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.comma',
        }),
        value: DataTokenType.COMMA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.whitespace',
        }),
        value: DataTokenType.SPACE,
      },
    ].sort((a, b) => a.label.localeCompare(b.label));

    const bottomOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.arbitraryText',
        }),
        value: DataTokenType.ARBITRARY_TEXT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.currentDate',
        }),
        value: DataTokenType.CURRENT_DATE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.constantConditional',
        }),
        value: DataTokenType.CONSTANT_CONDITIONAL,
      },
    ].sort((a, b) => a.label.localeCompare(b.label));

    return [
      ...topOptions,
      {
        label: '',
        value: DataTokenType.NEWLINE,
        disabled: true,
      },
      ...bottomOptions,
      {
        label: '',
        value: DataTokenType.NEWLINE,
        disabled: true,
      },
    ];
  }, [intl]);

  const noneAggregateOptions = useMemo(
    () =>
      [
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.userData',
          }),
          value: DataTokenType.USER_DATA,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.accountAmount',
          }),
          value: DataTokenType.ACCOUNT_AMOUNT,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.accountDate',
          }),
          value: DataTokenType.ACCOUNT_DATE,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType',
          }),
          value: DataTokenType.FEE_FINE_TYPE,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo',
          }),
          value: DataTokenType.ITEM_INFO,
        },
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [intl]
  );

  const aggregateOptions = useMemo(
    () =>
      [
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.userData',
          }),
          value: DataTokenType.USER_DATA,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.totalAmount',
          }),
          value: DataTokenType.AGGREGATE_TOTAL,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.numAccounts',
          }),
          value: DataTokenType.AGGREGATE_COUNT,
        },
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [intl]
  );

  return (
    <Field
      name={name}
      defaultValue={DataTokenType.NEWLINE}
      aria-label={intl.formatMessage({
        id: 'ui-plugin-bursar-export.bursarExports.token.dataType.typeSelect',
      })}
    >
      {(fieldProps) => (
        <Select<DataTokenType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={[
            ...alwaysAvailableOptions,
            ...(isAggregate ? aggregateOptions : noneAggregateOptions),
          ]}
        />
      )}
    </Field>
  );
}
