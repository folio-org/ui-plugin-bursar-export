import { Col, Select, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { usePatronGroups } from '../../api/queries';

export default function CriteriaPatronGroup({ prefix }: Readonly<{ prefix: string }>) {
  const patronGroups = usePatronGroups();

  const intl = useIntl();

  const selectedPatron = useField<string | undefined>(`${prefix}patronGroupId`, {
    subscription: { value: true },
  }).input.value;

  const selectOptions = useMemo(() => {
    if (!patronGroups.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...patronGroups.data
        .map((sp) => ({
          label: sp.group,
          value: sp.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [patronGroups]);

  const patronName = selectOptions.find((patron) => patron.value === selectedPatron)?.label;

  return (
    <Col xs={12}>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.select.PatronGroup' })}
      </Label>
      <Field name={`${prefix}patronGroupId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            aria-label={patronName === undefined ? 'Patron group' : patronName}
            dataOptions={selectOptions}
          />
        )}
      </Field>
    </Col>
  );
}
