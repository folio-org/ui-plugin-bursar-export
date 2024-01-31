import { Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../types/CriteriaTypes';
import useCriteriaCardOptions from './useCriteriaCardOptions';

export default function CriteriaCardSelect({
  name,
  root = false,
  patronOnly = false,
}: {
  name: string;
  root?: boolean;
  patronOnly?: boolean;
}) {
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaTerminalType.PASS;
    } else {
      return CriteriaGroupType.ALL_OF;
    }
  }, [root]);

  const intl = useIntl();

  const selectOptions = useCriteriaCardOptions(root, patronOnly);

  return (
    <Field
      name={name}
      defaultValue={selectDefaultValue}
      aria-label={intl.formatMessage({
        id: 'ui-plugin-bursar-export.bursarExports.criteria.select.label',
      })}
    >
      {(fieldProps) => (
        <Select<CriteriaGroupType | CriteriaTerminalType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
