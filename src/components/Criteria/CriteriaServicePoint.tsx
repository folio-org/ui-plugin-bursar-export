import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import useServicePoints from '../../api/queries/useServicePoints';

export default function CriteriaServicePoint({ prefix }: Readonly<{ prefix: string }>) {
  const servicePoints = useServicePoints();

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

  return (
    <Col xs={12}>
      <Field name={`${prefix}servicePointId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.servicePoint.value" />}
            dataOptions={selectOptions}
          />
        )}
      </Field>
    </Col>
  );
}
