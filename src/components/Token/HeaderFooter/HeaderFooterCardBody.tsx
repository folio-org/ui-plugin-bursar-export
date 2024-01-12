import { Row } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import ArbitraryTextToken from '../Shared/ArbitraryTextToken';
import CurrentDateToken from '../Shared/CurrentDateToken';
import WhitespaceToken from '../Shared/WhitespaceToken';
import AmountWithDecimalToken from '../Shared/AmountWithDecimalToken';

export const EMPTY_BODY_TYPES = [
  HeaderFooterTokenType.AGGREGATE_COUNT,
  HeaderFooterTokenType.COMMA,
  HeaderFooterTokenType.NEWLINE,
  HeaderFooterTokenType.NEWLINE_MICROSOFT,
  HeaderFooterTokenType.TAB,
];

export function isHeaderFooterBodyEmpty(
  type: HeaderFooterTokenType | undefined
) {
  return EMPTY_BODY_TYPES.includes(type ?? HeaderFooterTokenType.NEWLINE);
}

export default function HeaderFooterCardBody({ name }: { name: string }) {
  const type = useField<HeaderFooterTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? HeaderFooterTokenType.NEWLINE,
  }).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case HeaderFooterTokenType.ARBITRARY_TEXT:
        return (
          <Row>
            <ArbitraryTextToken prefix={`${name}.`} />
          </Row>
        );
      case HeaderFooterTokenType.SPACE:
        return (
          <Row>
            <WhitespaceToken prefix={`${name}.`} />
          </Row>
        );
      case HeaderFooterTokenType.CURRENT_DATE:
        return (
          <Row>
            <CurrentDateToken prefix={`${name}.`} />
          </Row>
        );
      case HeaderFooterTokenType.AGGREGATE_TOTAL:
        return (
          <Row>
            <AmountWithDecimalToken prefix={`${name}.`} />
          </Row>
        );

      default:
        return <div />;
    }
  }, [type]);

  return <div>{cardInterior}</div>;
}
