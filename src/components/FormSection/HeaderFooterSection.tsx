import { Button } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { HeaderFooterTokenType } from '../../types';
import { HeaderFooterCard } from '../Token';

export default function HeaderFooterSection({ name }: Readonly<{ name: string }>) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {fields.map((innerName, index) => (
            <HeaderFooterCard
              key={innerName}
              fieldArrayName={name}
              name={innerName}
              index={index}
              isLast={index + 1 === fields.length}
            />
          ))}
          <Button onClick={() => fields.push({ type: HeaderFooterTokenType.NEWLINE })}>
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.add" />
          </Button>
        </>
      )}
    </FieldArray>
  );
}
