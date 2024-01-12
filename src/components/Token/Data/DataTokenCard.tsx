import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import GenericTokenCard from '../GenericTokenCard';
import { TOKEN_TYPES_WITH_LENGTH_CONTROL } from '../LengthControlDrawer';
import DataTokenCardBody, { isDataBodyEmpty } from './DataTokenCardBody';
import DataTypeSelect from './DataTypeSelect';

export interface DataTokenCardProps {
  name: string;
  index: number;
  isLast: boolean;
}

export default function DataTokenCard({
  name,
  index,
  isLast,
}: DataTokenCardProps) {
  const type = useField<DataTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? DataTokenType.NEWLINE,
  }).input.value;

  const shouldHaveLengthControl = useCallback(
    () => TOKEN_TYPES_WITH_LENGTH_CONTROL.includes(type),
    [type]
  );

  return (
    <GenericTokenCard<DataTokenType>
      fieldArrayName="data"
      name={name}
      index={index}
      isLast={isLast}
      SelectComponent={DataTypeSelect}
      BodyComponent={DataTokenCardBody}
      isBodyEmpty={isDataBodyEmpty}
      shouldHaveLengthControl={shouldHaveLengthControl}
    />
  );
}
