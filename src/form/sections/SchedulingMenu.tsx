import {
  Col,
  MultiSelection,
  MultiSelectionDefaultOptionType,
  Row,
  Select,
  TextField,
  Timepicker,
} from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Weekday, useLocaleWeekdays } from '../../utils/WeekdayUtils';
import SchedulingFrequency from '../../types/SchedulingFrequency';

export function getIntervalLabel(frequency: SchedulingFrequency) {
  switch (frequency) {
    case SchedulingFrequency.Hours:
      return (
        <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.interval.hours" />
      );
    case SchedulingFrequency.Days:
      return (
        <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.interval.days" />
      );
    case SchedulingFrequency.Weeks:
      return (
        <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.interval.weeks" />
      );
    default:
      return '';
  }
}

export default function SchedulingMenu() {
  const frequencyValue = useField<SchedulingFrequency>('scheduling.frequency', {
    subscription: { value: true },
  }).input.value;

  const intl = useIntl();
  const localeWeekdays = useLocaleWeekdays(intl);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Field
          name="scheduling.frequency"
          defaultValue={SchedulingFrequency.Manual}
        >
          {(fieldProps) => (
            <Select<SchedulingFrequency>
              {...fieldProps}
              fullWidth
              required
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.frequency" />
              }
              dataOptions={[
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.manual',
                  }),
                  value: SchedulingFrequency.Manual,
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.hours',
                  }),
                  value: SchedulingFrequency.Hours,
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.days',
                  }),
                  value: SchedulingFrequency.Days,
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.weeks',
                  }),
                  value: SchedulingFrequency.Weeks,
                },
              ]}
            />
          )}
        </Field>
      </Col>
      {[
        SchedulingFrequency.Hours,
        SchedulingFrequency.Days,
        SchedulingFrequency.Weeks,
      ].includes(frequencyValue) && (
        <Col xs={12} md={6}>
          <Field name="scheduling.interval">
            {(fieldProps) => (
              <TextField<number>
                {...fieldProps}
                fullWidth
                required
                label={getIntervalLabel(frequencyValue)}
                min={1}
              />
            )}
          </Field>
        </Col>
      )}
      {[SchedulingFrequency.Days, SchedulingFrequency.Weeks].includes(
        frequencyValue
      ) && (
        <Col xs={12} md={6}>
          <Field name="scheduling.time">
            {(fieldProps) => (
              <Timepicker
                {...fieldProps}
                required
                label={intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduling.time',
                })}
              />
            )}
          </Field>
        </Col>
      )}
      {frequencyValue === SchedulingFrequency.Weeks && (
        <Col xs={12} md={6}>
          <Field name="scheduling.weekdays">
            {(fieldProps) => (
              <MultiSelection<MultiSelectionDefaultOptionType<Weekday>>
                {...fieldProps}
                required
                label={
                  <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.weekdays" />
                }
                dataOptions={localeWeekdays.map((weekday) => ({
                  label: weekday.long,
                  value: weekday.weekday,
                }))}
              />
            )}
          </Field>
        </Col>
      )}
    </Row>
  );
}
