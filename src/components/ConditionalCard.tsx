import { Card, IconButton } from '@folio/stripes/components';
import React, { ReactNode, useCallback } from 'react';
import { useFieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { CriteriaCard } from './Criteria';

export default function ConditionalCard({
  children,
  conditionName,
  fieldArrayName,
  patronOnly = false,
  index,
}: Readonly<{
  children: ReactNode;
  conditionName: string;
  fieldArrayName: string;
  patronOnly?: boolean;
  index: number;
}>) {
  const { fields } = useFieldArray(fieldArrayName);

  const handleMoveUpClick = useCallback(() => {
    fields.swap(index, index - 1);
  }, [fields, index]);

  const handleMoveDownClick = useCallback(() => {
    fields.swap(index, index + 1);
  }, [fields, index]);

  const handleRemoveClick = useCallback(() => {
    fields.remove(index);
  }, [fields, index]);

  return (
    <Card
      headerStart={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.conditional.card.header" />}
      headerEnd={
        <>
          <IconButton icon="caret-up" disabled={index === 0} onClick={handleMoveUpClick} />
          <IconButton icon="caret-down" disabled={index + 1 === fields.length} onClick={handleMoveDownClick} />
          <IconButton icon="trash" onClick={handleRemoveClick} />
        </>
      }
    >
      <CriteriaCard name={conditionName} alone patronOnly={patronOnly} />
      {children}
    </Card>
  );
}
