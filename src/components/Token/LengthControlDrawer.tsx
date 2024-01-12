import {
  Card,
  Checkbox,
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { DataTokenType, HeaderFooterTokenType } from '../../types/TokenTypes';

export const TOKEN_TYPES_WITH_LENGTH_CONTROL = [
  HeaderFooterTokenType.CURRENT_DATE,
  HeaderFooterTokenType.AGGREGATE_COUNT,
  HeaderFooterTokenType.AGGREGATE_TOTAL,

  DataTokenType.CURRENT_DATE,
  DataTokenType.ACCOUNT_AMOUNT,
  DataTokenType.ACCOUNT_DATE,
  DataTokenType.FEE_FINE_TYPE,
  DataTokenType.ITEM_INFO,
  DataTokenType.USER_DATA,

  DataTokenType.AGGREGATE_COUNT,
  DataTokenType.AGGREGATE_TOTAL,
];

function FakeHeader() {
  return <div />;
}

export default function LengthControlDrawer({ prefix }: { prefix: string }) {
  const isTruncateEnabled = useField<boolean>(`${prefix}truncate`, {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <Card headerComponent={FakeHeader} headerStart={<div />}>
      <Row style={{}}>
        <Col xs={6} md={3}>
          <Field name={`${prefix}length`}>
            {(fieldProps) => (
              <TextField<number>
                {...fieldProps}
                fullWidth
                marginBottom0
                type="number"
                min={1}
                label="Desired length"
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field name={`${prefix}character`}>
            {(fieldProps) => (
              <TextField<string>
                {...fieldProps}
                fullWidth
                marginBottom0
                maxLength={1}
                label="Fill extra space with"
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field<'FRONT' | 'BACK'>
            name={`${prefix}direction`}
            defaultValue="FRONT"
          >
            {(fieldProps) => (
              <Select<'FRONT' | 'BACK'>
                {...fieldProps}
                marginBottom0
                label={
                  isTruncateEnabled
                    ? 'Add/remove characters to/from'
                    : 'Add characters to'
                }
                dataOptions={[
                  { label: 'Start', value: 'FRONT' },
                  { label: 'End', value: 'BACK' },
                ]}
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field
            name={`${prefix}truncate`}
            type="checkbox"
            defaultValue={false}
          >
            {(fieldProps) => (
              <Checkbox
                {...fieldProps}
                fullWidth
                label="Truncate if too long"
              />
            )}
          </Field>
        </Col>{' '}
      </Row>
    </Card>
  );
}
