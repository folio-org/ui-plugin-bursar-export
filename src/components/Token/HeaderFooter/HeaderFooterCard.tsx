import React, { useCallback } from 'react';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import GenericTokenCard from '../GenericTokenCard';
import { useField } from 'react-final-form';
import HeaderFooterTypeSelect from './HeaderFooterTypeSelect';
import { TOKEN_TYPES_WITH_LENGTH_CONTROL } from '../LengthControlDrawer';
import HeaderFooterCardBody, {
  isHeaderFooterBodyEmpty,
} from './HeaderFooterCardBody';

export interface HeaderFooterCardProps {
  fieldArrayName: string;
  name: string;
  index: number;
  isLast: boolean;
}

export default function HeaderFooterCard({
  fieldArrayName,
  name,
  index,
  isLast,
}: HeaderFooterCardProps) {
  const type = useField<HeaderFooterTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? HeaderFooterTokenType.NEWLINE,
  }).input.value;

  const shouldHaveLengthControl = useCallback(
    () => TOKEN_TYPES_WITH_LENGTH_CONTROL.includes(type),
    [type]
  );

  return (
    <GenericTokenCard<HeaderFooterTokenType>
      fieldArrayName={fieldArrayName}
      name={name}
      index={index}
      isLast={isLast}
      SelectComponent={HeaderFooterTypeSelect}
      BodyComponent={HeaderFooterCardBody}
      isBodyEmpty={isHeaderFooterBodyEmpty}
      shouldHaveLengthControl={shouldHaveLengthControl}
    />
  );
}
