import { IconButton } from '@folio/stripes/components';
import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../../types/CriteriaTypes';

export interface CriteriaCardToolboxProps {
  prefix: string;
  root: boolean;
  alone: boolean;
  onRemove?: () => void;
}

export default function CriteriaCardToolbox({
  prefix,
  root = false,
  alone = false,
  onRemove,
}: CriteriaCardToolboxProps) {
  const type = useField<CriteriaGroupType | CriteriaTerminalType>(
    `${prefix}type`,
    // format ensures undefined is treated as default (pass)
    {
      subscription: { value: true },
      format: (value) => value || CriteriaTerminalType.PASS,
    }
  ).input.value;
  const criteria = useFieldArray<CriteriaGroup | CriteriaTerminal>(
    `${prefix}criteria`
  );

  const addCallback = useCallback(() => {
    criteria.fields.push({
      type: CriteriaGroupType.ALL_OF,
      criteria: [],
    });
  }, [criteria]);

  return (
    <div>
      {(
        [
          CriteriaGroupType.ALL_OF,
          CriteriaGroupType.ANY_OF,
          CriteriaGroupType.NONE_OF,
        ] as (CriteriaGroupType | CriteriaTerminalType)[]
      ).includes(type) && <IconButton icon="plus-sign" onClick={addCallback} />}
      {!root && <IconButton icon="trash" onClick={onRemove} disabled={alone} />}
    </div>
  );
}
