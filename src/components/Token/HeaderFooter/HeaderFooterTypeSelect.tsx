import React, { useMemo } from 'react';
import { Select } from '@folio/stripes/components';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { HeaderFooterTokenType } from '../../../types';

export default function HeaderFooterTypeSelect({ name }: Readonly<{ name: string }>) {
  const intl = useIntl();

  const selectedType = useField<HeaderFooterTokenType>(name, {
    subscription: { value: true },
  }).input.value;

  const options = useMemo(() => {
    const topSection = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Newline',
        }),
        value: HeaderFooterTokenType.NEWLINE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.NewlineMicrosoft',
        }),
        value: HeaderFooterTokenType.NEWLINE_MICROSOFT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Tab',
        }),
        value: HeaderFooterTokenType.TAB,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Comma',
        }),
        value: HeaderFooterTokenType.COMMA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Space',
        }),
        value: HeaderFooterTokenType.SPACE,
      },
    ];

    const bottomSection = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.Constant',
        }),
        value: HeaderFooterTokenType.ARBITRARY_TEXT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.CurrentDate',
        }),
        value: HeaderFooterTokenType.CURRENT_DATE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AggregateCount',
        }),
        value: HeaderFooterTokenType.AGGREGATE_COUNT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.AggregateTotal',
        }),
        value: HeaderFooterTokenType.AGGREGATE_TOTAL,
      },
    ];

    topSection.sort((a, b) => a.label.localeCompare(b.label));
    bottomSection.sort((a, b) => a.label.localeCompare(b.label));

    return [
      ...topSection,
      {
        label: '',
        value: HeaderFooterTokenType.NEWLINE,
        disabled: true,
      },
      ...bottomSection,
    ];
  }, [intl]);

  return (
    <Field
      name={name}
      defaultValue={HeaderFooterTokenType.NEWLINE}
      aria-label={intl.formatMessage({
        id:  `ui-plugin-bursar-export.bursarExports.token.${selectedType}`,
      })}
    >
      {(fieldProps) => <Select<HeaderFooterTokenType> {...fieldProps} required marginBottom0 dataOptions={options} />}
    </Field>
  );
}
