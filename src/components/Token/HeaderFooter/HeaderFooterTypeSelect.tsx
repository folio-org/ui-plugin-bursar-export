import React, { useMemo } from 'react';
import { Select } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';

export default function HeaderFooterTypeSelect({ name }: Readonly<{ name: string }>) {
  const intl = useIntl();
  const options = useMemo(() => {
    const topSection = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.newline',
        }),
        value: HeaderFooterTokenType.NEWLINE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.newlineMicrosoft',
        }),
        value: HeaderFooterTokenType.NEWLINE_MICROSOFT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.tab',
        }),
        value: HeaderFooterTokenType.TAB,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.comma',
        }),
        value: HeaderFooterTokenType.COMMA,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.whitespace',
        }),
        value: HeaderFooterTokenType.SPACE,
      },
    ];

    const bottomSection = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.arbitraryText',
        }),
        value: HeaderFooterTokenType.ARBITRARY_TEXT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.currentDate',
        }),
        value: HeaderFooterTokenType.CURRENT_DATE,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.numAccounts',
        }),
        value: HeaderFooterTokenType.AGGREGATE_COUNT,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.totalAmount',
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
        id: 'ui-plugin-bursar-export.bursarExports.token.headerFooter.typeSelect',
      })}
    >
      {(fieldProps) => <Select<HeaderFooterTokenType> {...fieldProps} required marginBottom0 dataOptions={options} />}
    </Field>
  );
}
