import { Col, Select, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useServicePoints } from '../../api/queries';

export default function CriteriaServicePoint({ prefix }: Readonly<{ prefix: string }>) {
  const servicePoints = useServicePoints();
  const intl = useIntl();

  const selectedServicePoint = useField<string | undefined>(`${prefix}servicePointId`, {
    subscription: { value: true },
  }).input.value;

  const selectOptions = useMemo(() => {
    if (!servicePoints.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...servicePoints.data
        .map((sp) => ({
          label: sp.name,
          value: sp.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [servicePoints]);

  const servicePointName = selectOptions.find((sp) => sp.value === selectedServicePoint)?.label;

  return (
    <Col xs={12}>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.servicePoint.value' })}
      </Label>
      <Field name={`${prefix}servicePointId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            aria-label={servicePointName === undefined ? 'Service point' : servicePointName}
            dataOptions={selectOptions}
          />
        )}
      </Field>
    </Col>
  );
}
