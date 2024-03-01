import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { usePatronGroups } from '../../api/queries';

export default function CriteriaPatronGroup({ prefix }: Readonly<{ prefix: string }>) {
  const patronGroups = usePatronGroups();

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

  return (
    <Col xs={12}>
      <Field name={`${prefix}patronGroupId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.patronGroup" />}
            dataOptions={selectOptions}
          />
        )}
      </Field>
    </Col>
  );
}
