import { Row } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import AmountWithDecimalToken from '../Shared/AmountWithDecimalToken';
import ArbitraryTextToken from '../Shared/ArbitraryTextToken';
import CurrentDateToken from '../Shared/CurrentDateToken';
import WhitespaceToken from '../Shared/WhitespaceToken';
import AccountDateToken from './AccountDateToken';
import FeeFineTypeToken from './FeeFineTypeToken';
import ItemInfoToken from './ItemInfoToken';
import UserInfoToken from './UserInfoToken';
import ConstantConditionalToken from './ConstantConditionalToken';

export const EMPTY_BODY_TYPES = [
  DataTokenType.COMMA,
  DataTokenType.NEWLINE,
  DataTokenType.NEWLINE_MICROSOFT,
  DataTokenType.TAB,

  DataTokenType.AGGREGATE_COUNT,
];

export function isDataBodyEmpty(type: DataTokenType | undefined) {
  return EMPTY_BODY_TYPES.includes(type ?? DataTokenType.NEWLINE);
}

export default function DataTokenCardBody({ name }: { name: string }) {
  const type = useField<DataTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? DataTokenType.NEWLINE,
  }).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case DataTokenType.ARBITRARY_TEXT:
        return (
          <Row>
            <ArbitraryTextToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.SPACE:
        return (
          <Row>
            <WhitespaceToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.CURRENT_DATE:
        return (
          <Row>
            <CurrentDateToken prefix={`${name}.`} />
          </Row>
        );

      case DataTokenType.AGGREGATE_TOTAL:
      case DataTokenType.ACCOUNT_AMOUNT:
        return (
          <Row>
            <AmountWithDecimalToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.ACCOUNT_DATE:
        return (
          <Row>
            <AccountDateToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.FEE_FINE_TYPE:
        return (
          <Row>
            <FeeFineTypeToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.ITEM_INFO:
        return (
          <Row>
            <ItemInfoToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.USER_DATA:
        return (
          <Row>
            <UserInfoToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.CONSTANT_CONDITIONAL:
        return (
          <Row>
            <ConstantConditionalToken prefix={`${name}.`} />
          </Row>
        );

      default:
        return <div />;
    }
  }, [type]);

  return <div>{cardInterior}</div>;
}
