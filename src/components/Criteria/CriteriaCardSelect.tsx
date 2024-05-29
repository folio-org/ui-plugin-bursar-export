import { Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { CriteriaGroupType, CriteriaTerminalType } from '../../types';
import useCriteriaCardOptions from '../../hooks/useCriteriaCardOptions';

export default function CriteriaCardSelect({
  name,
  root = false,
  patronOnly = false,
}: Readonly<{
  name: string;
  root?: boolean;
  patronOnly?: boolean;
}>) {
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaTerminalType.PASS;
    } else {
      return CriteriaGroupType.ALL_OF;
    }
  }, [root]);

  const intl = useIntl();

  const selectOptions = useCriteriaCardOptions(root, patronOnly);

  const selectValue = useField<CriteriaTerminalType | CriteriaGroupType>(name, {
    subscription: { value: true },
  }).input.value;

  return (
    <Field
      name={name}
      defaultValue={selectDefaultValue}
    >
      {(fieldProps) => (
        <Select<CriteriaGroupType | CriteriaTerminalType>
          {...fieldProps}
          required
          marginBottom0
          aria-label={selectValue.length === 0 ?
            intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.accordion' }) :
            intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.criteria.select.${selectValue}` })
          }
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
