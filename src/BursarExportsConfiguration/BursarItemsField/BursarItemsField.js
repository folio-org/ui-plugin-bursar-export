import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useIntl } from 'react-intl';

import {
  Col,
  Headline,
  Label,
  RepeatableField,
  Row,
  TextField,
} from '@folio/stripes/components';
import {
  FieldSelectFinal,
  usePrevious,
} from '@folio/stripes-acq-components';

import {
  ITEM_DESCRIPTION_LENGTH,
  ITEM_DESCRIPTION_SYMBOL,
  ITEM_TYPE_LENGTH,
  ITEM_TYPE_SYMBOL,
} from '../constants';
import { padString } from '../utils';

import { BursarItemsFilter } from './BursarItemsFilter';
import { useOwnerFeeFinesQuery } from './useOwnerFeeFinesQuery';

import css from './BursarItemsField.css';

const ITEMS_CODES = ['CHARGE', 'PAYMENT'];

const formatItemType = value => {
  if (!value) return '';

  return padString(value, ITEM_TYPE_SYMBOL, ITEM_TYPE_LENGTH);
};

const formatItemDesription = value => {
  if (!value) return '';

  return padString(value, ITEM_DESCRIPTION_SYMBOL, ITEM_DESCRIPTION_LENGTH, false);
};

export const BursarItemsField = ({ onChange }) => {
  const { formatMessage } = useIntl();
  const [filter, setFilter] = useState({});

  const ownerId = filter.owner;
  const prevOwnerId = usePrevious(ownerId);
  const { feeFines } = useOwnerFeeFinesQuery(ownerId, prevOwnerId);

  useEffect(() => {
    if (feeFines.length) {
      onChange(ownerId, feeFines.map(({ id }) => ({ feefineTypeId: id })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeFines]);

  const onFilterChange = filterChanges => setFilter(filterState => ({ ...filterState, ...filterChanges }));

  const headLabels = (
    <Row>
      <Col xs={3}>
        <Label>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.feeFineType' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemType' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemDescription' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemCode' })}
        </Label>
      </Col>
    </Row>
  );

  return (
    <fieldset>
      <Headline size="large">
        {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemTypes' })}
      </Headline>

      <BursarItemsFilter onChange={onFilterChange} />

      <FieldArray
        name={`exportTypeSpecificParameters.bursarFeeFines.typeMappings[${ownerId}]`}
        canRemove={false}
        canAdd={false}
        onRemove={false}
        component={RepeatableField}
        headLabels={headLabels}
        renderField={(field, i, fields) => {
          const feeFine = feeFines.find(f => f.id === fields.value[i].feefineTypeId) || {};

          return (
            <Row key={feeFine.id}>
              <Col xs={3}>
                <TextField
                  value={feeFine.feeFineType}
                  disabled
                  aria-label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.feeFineType' })}
                />
              </Col>

              <Col xs={3}>
                <Field
                  component={TextField}
                  name={`${field}.itemType`}
                  aria-label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemType' })}
                  inputClass={css.bursarItemsPaddedField}
                  format={formatItemType}
                  formatOnBlur
                />
              </Col>

              <Col xs={3}>
                <Field
                  component={TextField}
                  name={`${field}.itemDescription`}
                  aria-label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemDescription' })}
                  inputClass={css.bursarItemsPaddedField}
                  format={formatItemDesription}
                  formatOnBlur
                />
              </Col>

              <Col xs={3}>
                <FieldSelectFinal
                  dataOptions={ITEMS_CODES.map(code => ({
                    value: code,
                    label: formatMessage({ id: `ui-plugin-bursar-export.bursarExports.itemCode.${code}` }),
                  }))}
                  name={`${field}.itemCode`}
                  aria-label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemCode' })}
                />
              </Col>
            </Row>
          );
        }}
      />
    </fieldset>
  );
};

BursarItemsField.propTypes = {
  onChange: PropTypes.func.isRequired,
};
