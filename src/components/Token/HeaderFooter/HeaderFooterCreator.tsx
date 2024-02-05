import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import GenericTokenCard from '../GenericTokenCard';
import HeaderFooterTypeSelect from './HeaderFooterTypeSelect';
import { TOKEN_TYPES_WITH_LENGTH_CONTROL } from '../LengthControlDrawer';
import HeaderFooterCreatorBody, {
  isHeaderFooterBodyEmpty,
} from './HeaderFooterCreatorBody';

export interface HeaderFooterCreatorProps {
  fieldArrayName: string;
  name: string;
  index: number;
  isLast: boolean;
}

export default function HeaderFooterCreator({
  fieldArrayName,
  name,
  index,
  isLast,
}: HeaderFooterCreatorProps) {
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
      BodyComponent={HeaderFooterCreatorBody}
      isBodyEmpty={isHeaderFooterBodyEmpty}
      shouldHaveLengthControl={shouldHaveLengthControl}
    />
  );
}
