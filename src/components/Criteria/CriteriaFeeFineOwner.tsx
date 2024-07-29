import { Col, Select, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useFeeFineOwners } from '../../api/queries';

export default function CriteriaFeeFineOwner({ prefix }: Readonly<{ prefix: string }>) {
  const feeFineOwners = useFeeFineOwners();
  const intl = useIntl();

  const selectedOwner = useField<string | undefined>(`${prefix}feeFineOwnerId`, {
    subscription: { value: true },
  }).input.value;

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [{ label: '', value: '', disabled: true }];
    }

    return [
      { label: '', value: '', disabled: true },
      ...feeFineOwners.data
        .map((owner) => ({
          label: owner.owner,
          value: owner.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [feeFineOwners]);

  const ownerName = ownersSelectOptions.find((owner) => owner.value === selectedOwner)?.label;

  return (
    <Col xs={12}>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.select.FeeFineOwner' })}
      </Label>
      <Field name={`${prefix}feeFineOwnerId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            aria-label={ownerName?.length === 0 ? 'Fee/fine owner' : ownerName}
            dataOptions={ownersSelectOptions}
          />
        )}
      </Field>
    </Col>
  );
}
