import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import useFeeFineOwners from '../../api/queries/useFeeFineOwners';

export default function CriteriaFeeFineOwner({ prefix }: { prefix: string }) {
  const feeFineOwners = useFeeFineOwners();

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [];
    }

    return feeFineOwners.data.map((owner) => ({
      label: owner.owner,
      value: owner.id,
    }));
  }, [feeFineOwners]);

  return (
    <>
      <Col xs={12}>
        <Field name={`${prefix}feeFineOwnerId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Fee/fine owner"
              dataOptions={[
                { label: '', value: '', disabled: true },
                ...ownersSelectOptions,
              ]}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
