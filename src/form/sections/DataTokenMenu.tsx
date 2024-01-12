import { Button } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import DataTokenCard from '../../components/Token/Data/DataTokenCard';
import { DataTokenType } from '../../types/TokenTypes';
import { useField } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

export default function DataTokenMenu() {
  const aggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const name = useMemo(() => {
    if (aggregate) {
      return 'dataAggregate';
    } else {
      return 'data';
    }
  }, [aggregate]);

  return (
    <FieldArray key={name} name={name}>
      {({ fields }) => (
        <>
          {fields.map((innerName, index) => (
            <DataTokenCard
              key={innerName}
              name={innerName}
              index={index}
              isLast={index + 1 === fields.length}
            />
          ))}
          <Button onClick={() => fields.push({ type: DataTokenType.NEWLINE })}>
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.add" />
          </Button>
        </>
      )}
    </FieldArray>
  );
}
