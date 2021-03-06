import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useIntl } from 'react-intl';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  Checkbox,
  Col,
  Label,
  Row,
  Select,
  TextField,
  Timepicker,
} from '@folio/stripes/components';

import {
  SCHEDULE_PERIODS,
  WEEKDAYS,
} from './constants';
import { diffTransferTypes } from './utils';
import { validateRequired } from './validation';
import { BursarItemsField } from './BursarItemsField';
import { FeeFineOwnerField } from './FeeFineOwnerField';
import { TransferAccountField } from './TransferAccountField';
import { PatronGroupsField } from './PatronGroupsField';

import styles from './BursarExportsConfiguration.css';

const normalizeNumber = value => {
  if (!value && value !== 0) return value;

  return Number(value);
};

export const BursarExportsConfigurationForm = ({
  form,
  handleSubmit,
  onFormStateChanged,
  pristine,
  submitting,
  patronGroups,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    onFormStateChanged(form);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pristine, submitting]);

  const schedulePeriodOptions = useMemo(() => (
    Object.keys(SCHEDULE_PERIODS)
      .map(periodKey => ({
        label: formatMessage({
          id: `ui-plugin-bursar-export.bursarExports.schedulePeriod.${periodKey}`,
        }),
        value: SCHEDULE_PERIODS[periodKey],
      }))
  ), [formatMessage]);

  const formValues = form.getState()?.values || {};

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.bursarExportsConfiguration}
    >
      <Row>
        <Col xs={4}>
          <Field
            data-testid="schedule-period"
            label={formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.schedulePeriod',
            })}
            name="schedulePeriod"
            component={Select}
            dataOptions={schedulePeriodOptions}
            onChange={form.mutators.changeSchedulePeriod}
            required
          />
        </Col>

        {
          formValues.schedulePeriod !== SCHEDULE_PERIODS.none && (
            <Col xs={4}>
              <Field
                data-testid="schedule-frequency"
                component={TextField}
                label={formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduleFrequency',
                })}
                name="scheduleFrequency"
                type="number"
                min={1}
                hasClearIcon={false}
                required
                validate={validateRequired}
                parse={normalizeNumber}
              />
            </Col>
          )
        }
      </Row>

      {
        formValues.schedulePeriod === SCHEDULE_PERIODS.weeks && (
          <Row>
            <Col xs={12}>
              <Label required>
                {formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduleWeekdays',
                })}
              </Label>

              <FieldArray name="weekDays" validate={validateRequired}>
                {
                  ({ fields }) => WEEKDAYS.map((weekday, index) => (
                    <Field
                      key={index}
                      component={Checkbox}
                      label={formatMessage({
                        id: `ui-plugin-bursar-export.bursarExports.scheduleWeekdays.${weekday}`,
                      })}
                      name={`${fields.name}[${weekday}]`}
                      type="checkbox"
                      vertical
                    />
                  ))
                }
              </FieldArray>
            </Col>
          </Row>
        )
      }

      {
        [SCHEDULE_PERIODS.days, SCHEDULE_PERIODS.weeks].includes(formValues.schedulePeriod) && (
          <Row>
            <Col xs={4}>
              <Field
                data-testid="schedule-time"
                component={Timepicker}
                label={formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduleTime',
                })}
                name="scheduleTime"
                required
                validate={validateRequired}
              />
            </Col>
          </Row>
        )
      }

      <Row>
        <Col xs={4}>
          <Field
            data-testid="days-outstanding"
            component={TextField}
            label={formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.daysOutstanding',
            })}
            name="exportTypeSpecificParameters.bursarFeeFines.daysOutstanding"
            type="number"
            min={1}
            hasClearIcon={false}
            required
            validate={validateRequired}
            parse={normalizeNumber}
          />
        </Col>

        <Col xs={4}>
          <PatronGroupsField patronGroups={patronGroups} />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <FeeFineOwnerField onChange={form.mutators.changeOwner} />
        </Col>

        <Col xs={4}>
          <TransferAccountField
            ownerId={formValues.exportTypeSpecificParameters?.bursarFeeFines?.feefineOwnerId}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <BursarItemsField onChange={form.mutators.changeTransferTypes} />
        </Col>
      </Row>
    </form>
  );
};

BursarExportsConfigurationForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFormStateChanged: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  patronGroups: PropTypes.arrayOf(PropTypes.object),
};

export const BursarExportsConfiguration = stripesFinalForm({
  keepDirtyOnReinitialize: true,
  subscription: { values: true },
  navigationCheck: true,
  mutators: {
    changeSchedulePeriod: (args, state, utils) => {
      const nextValue = args[0].target.value;
      const prevValue = state.formState.values.schedulePeriod;

      utils.changeValue(state, 'schedulePeriod', () => nextValue);

      if (prevValue === SCHEDULE_PERIODS.none) {
        utils.changeValue(state, 'scheduleFrequency', () => 1);
      }

      if (prevValue === SCHEDULE_PERIODS.weeks) {
        utils.changeValue(state, 'weekDays', () => undefined);
      }

      if ([SCHEDULE_PERIODS.none, SCHEDULE_PERIODS.hours].includes(nextValue)) {
        utils.changeValue(state, 'scheduleTime', () => undefined);
      }

      if (nextValue === SCHEDULE_PERIODS.none) {
        utils.changeValue(state, 'scheduleFrequency', () => undefined);
      }
    },
    changeOwner: (args, state, utils) => {
      utils.changeValue(
        state,
        'exportTypeSpecificParameters.bursarFeeFines.feefineOwnerId',
        () => args[0].target.value,
      );
      utils.changeValue(
        state,
        'exportTypeSpecificParameters.bursarFeeFines.transferAccountId',
        () => undefined,
      );
    },
    changeTransferTypes: ([ownerId, newTransferTypes], state, utils) => {
      const typesMapping = state.formState.values.exportTypeSpecificParameters?.bursarFeeFines?.typeMappings || {};
      const prevTransferTypes = typesMapping[ownerId] || [];
      const transferTypesDiff = diffTransferTypes(newTransferTypes, prevTransferTypes);

      if (transferTypesDiff.length) {
        utils.changeValue(
          state,
          'exportTypeSpecificParameters.bursarFeeFines.typeMappings',
          () => ({
            ...typesMapping,
            [ownerId]: [...prevTransferTypes, ...transferTypesDiff],
          }),
        );
      }
    },
  },
})(BursarExportsConfigurationForm);
