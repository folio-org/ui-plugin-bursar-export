import { Card, Col, Row, Select, TextField } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { CriteriaAggregateType } from '../../types/CriteriaTypes';
import { Field, useField } from 'react-final-form';
import OperatorSelect from '../Criteria/OperatorSelect';
import useMonetaryOnBlur from '../../hooks/useMonetaryOnBlur';
import { FormattedMessage, useIntl } from 'react-intl';

export default function AggregateCriteriaCard() {
  const selectedType = useField<CriteriaAggregateType>('aggregateFilter.type', {
    subscription: { value: true },
    format: (value) => value ?? CriteriaAggregateType.PASS,
  }).input.value;

  const monetaryOnBlur = useMonetaryOnBlur('aggregateFilter.amountDollars');
  const intl = useIntl();

  const criteriaOptions = useMemo(
    () =>
      [
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.numAccounts',
          }),
          value: CriteriaAggregateType.NUM_ROWS,
        },
        {
          label: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.totalAmount',
          }),
          value: CriteriaAggregateType.TOTAL_AMOUNT,
        },
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [intl]
  );

  return (
    <Card
      headerStart={
        <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter.header" />
      }
    >
      <Row>
        <Col xs={12} md={4}>
          <Field
            name="aggregateFilter.type"
            defaultValue={CriteriaAggregateType.PASS}
          >
            {(fieldProps) => (
              <Select<CriteriaAggregateType>
                {...fieldProps}
                fullWidth
                marginBottom0
                required
                label={
                  <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter" />
                }
                dataOptions={[
                  {
                    label: intl.formatMessage({
                      id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.none',
                    }),
                    value: CriteriaAggregateType.PASS,
                  },
                  ...criteriaOptions,
                ]}
              />
            )}
          </Field>
        </Col>

        {selectedType !== CriteriaAggregateType.PASS && (
          <Col xs={12} md={4}>
            <OperatorSelect name="aggregateFilter.operator" />
          </Col>
        )}

        {selectedType === CriteriaAggregateType.NUM_ROWS && (
          <Col xs={12} md={4}>
            <Field name="aggregateFilter.amount">
              {(fieldProps) => (
                <TextField<number>
                  {...fieldProps}
                  fullWidth
                  marginBottom0
                  required
                  type="number"
                  label={
                    <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter.numAccounts.amount" />
                  }
                  min={1}
                  step={1}
                />
              )}
            </Field>
          </Col>
        )}

        {selectedType === CriteriaAggregateType.TOTAL_AMOUNT && (
          <Col xs={12} md={4}>
            <Field name="aggregateFilter.amountDollars">
              {(fieldProps) => (
                <TextField<number>
                  {...fieldProps}
                  fullWidth
                  marginBottom0
                  required
                  type="number"
                  label={
                    <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter.totalAmount.amount" />
                  }
                  min={0}
                  step={0.01}
                  onBlur={monetaryOnBlur}
                />
              )}
            </Field>
          </Col>
        )}
      </Row>

      <p style={{ marginBottom: 0 }}>
        <i>
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter.description" />
        </i>
      </p>
    </Card>
  );
}
