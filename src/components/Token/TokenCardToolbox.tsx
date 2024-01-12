import { IconButton } from '@folio/stripes/components';
import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';

export interface TokenCardToolboxProps {
  fieldArrayName: string;
  name: string;
  index: number;
  isLast: boolean;
  showLengthControl: boolean;
}

export default function TokenCardToolbox({
  fieldArrayName,
  name,
  index,
  isLast,
  showLengthControl,
}: TokenCardToolboxProps) {
  const fieldArray = useFieldArray(fieldArrayName);
  const lengthControlOpen = useField<boolean>(
    `${name}.lengthControl.drawerOpen`,
    {
      subscription: { value: true },
      format: (value) => value ?? false,
    }
  );

  const removeCallback = useCallback(
    () => fieldArray.fields.remove(index),
    [fieldArray.fields, index]
  );

  const lengthControlCallback = useCallback(
    () => lengthControlOpen.input.onChange(!lengthControlOpen.input.value),
    [lengthControlOpen, index]
  );

  const moveUpCallback = useCallback(
    () => fieldArray.fields.swap(index, index - 1),
    [fieldArray.fields, index]
  );

  const moveDownCallback = useCallback(
    () => fieldArray.fields.swap(index, index + 1),
    [fieldArray.fields, index]
  );

  return (
    <>
      {showLengthControl && (
        <IconButton icon="gear" onClick={lengthControlCallback} />
      )}
      <IconButton
        icon="caret-up"
        disabled={index === 0}
        onClick={moveUpCallback}
      />
      <IconButton
        icon="caret-down"
        disabled={isLast}
        onClick={moveDownCallback}
      />
      <IconButton icon="trash" onClick={removeCallback} />
    </>
  );
}
