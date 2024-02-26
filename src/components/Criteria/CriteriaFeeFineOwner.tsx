import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { useFeeFineOwners } from '../../api/queries';

export default function CriteriaFeeFineOwner({ prefix }: Readonly<{ prefix: string }>) {
  const feeFineOwners = useFeeFineOwners();

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [];
    }

    return feeFineOwners.data
      .map((owner) => ({
        label: owner.owner,
        value: owner.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [feeFineOwners]);

  return (
    <Col xs={12}>
      <Field name={`${prefix}feeFineOwnerId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.owner" />}
            dataOptions={[{ label: '', value: '', disabled: true }, ...ownersSelectOptions]}
          />
        )}
      </Field>
    </Col>
  );
}
