import { Col, Row, Select, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useFeeFineOwners, useTransferAccounts } from '../api/queries';

export default function TransferAccountFields({ prefix }: Readonly<{ prefix: string }>) {
  const feeFineOwners = useFeeFineOwners();
  const transferAccounts = useTransferAccounts();
  const intl = useIntl();

  const selectedOwner = useField<string | undefined>(`${prefix}owner`, {
    subscription: { value: true },
    // provide default value for when the field is not yet initialized
    format: (value) => value,
  }).input.value;

  const selectedAccount = useField<string | undefined>(`${prefix}account`, {
    subscription: { value: true },
    // provide default value for when the field is not yet initialized
    format: (value) => value,
  }).input.value;

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [{ label: '', value: undefined, disabled: true }];
    }

    return [
      { label: '', value: undefined, disabled: true },
      ...feeFineOwners.data
        .map((owner) => ({
          label: owner.owner,
          value: owner.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [feeFineOwners]);

  const accountSelectOptions = useMemo(() => {
    if (!transferAccounts.isSuccess || !selectedOwner) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...transferAccounts.data
        .filter((type) => type.ownerId === selectedOwner)
        .map((type) => ({
          label: type.accountName,
          value: type.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [selectedOwner, transferAccounts]);

  const ownerName = ownersSelectOptions.find((owner) => owner.value === selectedOwner)?.label;
  const accountName = accountSelectOptions.find((account) => account.value === selectedAccount)?.label;

  return (
    <Row>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transfer.owner' })}
        </Label>
        <Field name={`${prefix}owner`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              aria-label={ownerName === undefined ? ownerName :
                intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transfer.owner' })
              }
              dataOptions={ownersSelectOptions}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transfer.account' })}
        </Label>
        <Field name={`${prefix}account`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              aria-label={accountName === undefined ? accountName :
                intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transfer.account' })
              }
              dataOptions={accountSelectOptions}
            />
          )}
        </Field>
      </Col>
    </Row>
  );
}
