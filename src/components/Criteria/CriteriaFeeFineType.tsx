import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFeeFineOwners, useFeeFineTypes } from '../../api/queries';

export default function CriteriaFeeFineType({ prefix }: Readonly<{ prefix: string }>) {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();
  const intl = useIntl();

  const selectedOwner = useField<string | undefined>(`${prefix}feeFineOwnerId`, {
    subscription: { value: true },
    // provide default value for when the field is not yet initialized
    format: (value) => value ?? 'automatic',
  }).input.value;

  const ownersSelectOptions = useMemo(() => {
    const defaultOption = {
      label: intl.formatMessage({
        id: 'ui-plugin-bursar-export.bursarExports.criteria.type.automatic',
      }),
      value: 'automatic',
    };

    if (!feeFineOwners.isSuccess) {
      return [defaultOption];
    }

    return [
      defaultOption,
      ...feeFineOwners.data
        .map((owner) => ({
          label: owner.owner,
          value: owner.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [feeFineOwners, intl]);

  const typeSelectOptions = useMemo(() => {
    if (!feeFineTypes.isSuccess) {
      return [];
    }

    if (selectedOwner === 'automatic') {
      return feeFineTypes.data
        .filter((type) => type.automatic)
        .map((type) => ({
          label: type.feeFineType,
          value: type.id,
        }));
    }

    return feeFineTypes.data
      .filter((type) => type.ownerId === selectedOwner)
      .map((type) => ({
        label: type.feeFineType,
        value: type.id,
      }));
  }, [selectedOwner, feeFineTypes]);

  const typeSelectOptionsForDisplay = useMemo(
    () => [{ label: '', value: undefined }, ...typeSelectOptions].sort((a, b) => a.label.localeCompare(b.label)),
    [typeSelectOptions],
  );

  return (
    <>
      <Col xs={12} md={6}>
        <Field name={`${prefix}feeFineOwnerId`} defaultValue="automatic">
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.owner" />}
              dataOptions={[
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.criteria.type.automatic',
                  }),
                  value: 'automatic',
                },
                ...ownersSelectOptions,
              ].sort((a, b) => a.label.localeCompare(b.label))}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}feeFineTypeId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.type" />}
              dataOptions={typeSelectOptionsForDisplay}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
