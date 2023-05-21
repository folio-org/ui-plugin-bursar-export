import { Button } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { HeaderFooterTokenType } from '../../types/TokenTypes';
import HeaderFooterCard from '../../components/Token/HeaderFooter/HeaderFooterCard';

export default function HeaderFooterMenu({ name }: { name: string }) {
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
          <Button
            onClick={() => fields.push({ type: HeaderFooterTokenType.NEWLINE })}
          >
            Add
          </Button>
        </>
      )}
    </FieldArray>
  );
}
