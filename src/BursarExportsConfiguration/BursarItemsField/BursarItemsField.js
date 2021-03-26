import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useIntl } from 'react-intl';

import {
  Col,
  Label,
  RepeatableField,
  Row,
  TextField,
} from '@folio/stripes/components';
import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import {
  ITEM_DESCRIPTION_LENGTH,
  ITEM_DESCRIPTION_SYMBOL,
  ITEM_TYPE_LENGTH,
  ITEM_TYPE_SYMBOL,
} from '../../constants';
import { padString } from '../../utils';
import { validateRequired } from '../validation';
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

export const BursarItemsField = ({ value, ownerId, onChange }) => {
  const { formatMessage } = useIntl();
  const { feeFines } = useOwnerFeeFinesQuery(ownerId);

  useEffect(() => {
    if (
      feeFines.length
      && (
        value?.length !== feeFines.length
        || value[0]?.feefineTypeId !== feeFines[0]?.id
      )
    ) {
      onChange(feeFines.map(({ id }) => ({ feefineTypeId: id })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, feeFines]);

  if (!feeFines.length) {
    return null;
  }

  const headLabels = (
    <Row>
      <Col xs={3}>
        <Label required>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.feeFineType' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label required>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemType' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label required>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemDescription' })}
        </Label>
      </Col>
      <Col xs={3}>
        <Label required>
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemCode' })}
        </Label>
      </Col>
    </Row>
  );

  return (
    <FieldArray
      legend={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemTypes' })}
      name="exportTypeSpecificParameters.bursarFeeFines.typeMappings"
      canRemove={false}
      canAdd={false}
      onRemove={false}
      component={RepeatableField}
      headLabels={headLabels}
      renderField={(field, i) => {
        const feeFine = feeFines[i] || {};

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
                required
                validate={validateRequired}
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
                required
                validate={validateRequired}
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
                required
                aria-label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.itemCode' })}
              />
            </Col>
          </Row>
        );
      }}
    />
  );
};

BursarItemsField.propTypes = {
  ownerId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object),
};
