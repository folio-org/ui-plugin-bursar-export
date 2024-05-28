import { Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { DataTokenType } from '../../../types';

export default function DataTypeSelect({ name }: Readonly<{ name: string }>) {
  const isAggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const selectedDataType = useField<DataTokenType>(name, {
    subscription: { value: true }
  }).input.value;

  const intl = useIntl();

  const alwaysAvailableOptions = useMemo(() => {
    const topOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Newline',
        }),
        value: DataTokenType.NEWLINE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.NewlineMicrosoft',
        }),
        value: DataTokenType.NEWLINE_MICROSOFT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Tab',
        }),
        value: DataTokenType.TAB,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Comma',
        }),
        value: DataTokenType.COMMA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Space',
        }),
        value: DataTokenType.SPACE,
      },
    ].sort((a, b) => a.label.localeCompare(b.label));

    const bottomOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Constant',
        }),
        value: DataTokenType.ARBITRARY_TEXT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.CurrentDate',
        }),
        value: DataTokenType.CURRENT_DATE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.ConstantConditional',
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
    () => [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.UserData',
        }),
        value: DataTokenType.USER_DATA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AccountAmount',
        }),
        value: DataTokenType.ACCOUNT_AMOUNT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AccountDate',
        }),
        value: DataTokenType.ACCOUNT_DATE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.FeeFineMetaData',
        }),
        value: DataTokenType.FEE_FINE_TYPE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.ItemData',
        }),
        value: DataTokenType.ITEM_INFO,
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
    [intl],
  );

  const aggregateOptions = useMemo(
    () => [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userData',
        }),
        value: DataTokenType.USER_DATA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AggregateTotal',
        }),
        value: DataTokenType.AGGREGATE_TOTAL,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AggregateCount',
        }),
        value: DataTokenType.AGGREGATE_COUNT,
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
    [intl],
  );

  return (
    <Field
      name={name}
      defaultValue={DataTokenType.NEWLINE}
      aria-label={intl.formatMessage({
        id: `ui-plugin-bursar-export.bursarExports.token.${selectedDataType}`,
      })}
    >
      {(fieldProps) => (
        <Select<DataTokenType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={[...alwaysAvailableOptions, ...(isAggregate ? aggregateOptions : noneAggregateOptions)]}
        />
      )}
    </Field>
  );
}
