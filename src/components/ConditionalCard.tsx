import { Card, IconButton } from '@folio/stripes/components';
import React, { ReactNode } from 'react';
import { useFieldArray } from 'react-final-form-arrays';
import CriteriaCard from './Criteria/CriteriaCard';

export default function ConditionalCard({
  children,
  conditionName,
  fieldArrayName,
  patronOnly = false,
  index,
}: {
  children: ReactNode;
  conditionName: string;
  fieldArrayName: string;
  patronOnly?: boolean;
  index: number;
}) {
  const { fields } = useFieldArray(fieldArrayName);

  return (
    <Card
      headerStart="If:"
      headerEnd={
        <>
          <IconButton
            icon="caret-up"
            disabled={index === 0}
            onClick={() => fields.swap(index, index - 1)}
          />
          <IconButton
            icon="caret-down"
            disabled={index + 1 === fields.length}
            onClick={() => fields.swap(index, index + 1)}
          />
          <IconButton icon="trash" onClick={() => fields.remove(index)} />
        </>
      }
    >
      <CriteriaCard name={conditionName} alone patronOnly={patronOnly} />
      {children}
    </Card>
  );
}
