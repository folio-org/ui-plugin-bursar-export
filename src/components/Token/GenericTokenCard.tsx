import React, { useMemo } from 'react';
import css from '../Card.module.css';
import { Card } from '@folio/stripes/components';
import classNames from 'classnames';
import { useField } from 'react-final-form';
import TokenCardToolbox from './TokenCardToolbox';

export interface GenericTokenCardProps<TypeEnum> {
  fieldArrayName: string;
  name: string;
  index: number;
  isLast: boolean;
  SelectComponent: React.ComponentType<{ name: string }>;
  BodyComponent: React.ComponentType<{ name: string }>;
  isBodyEmpty: (type?: TypeEnum) => boolean;
  shouldHaveLengthControl: (type?: TypeEnum) => boolean;
}

export default function GenericTokenCard<TypeEnum>({
  fieldArrayName,
  name,
  index,
  isLast,
  SelectComponent,
  BodyComponent,
  isBodyEmpty,
  shouldHaveLengthControl,
}: GenericTokenCardProps<TypeEnum>) {
  const type = useField<TypeEnum | undefined>(`${name}.type`, {
    subscription: { value: true },
    // preserve undefined
    format: (value) => value,
  }).input.value;

  // cache this since we use it multiple times
  const lengthControlAvailable = useMemo(
    () => shouldHaveLengthControl(type),
    [type, shouldHaveLengthControl]
  );

  // TODO: show length control panel

  return (
    <Card
      cardClass={css.cardClass}
      headerClass={css.headerClass}
      headerStart={<SelectComponent name={name} />}
      headerEnd={
        <TokenCardToolbox
          fieldArrayName={fieldArrayName}
          name={name}
          index={index}
          isLast={isLast}
          showLengthControl={lengthControlAvailable}
        />
      }
      bodyClass={classNames({
        [css.emptyBody]: isBodyEmpty(type),
      })}
    >
      <BodyComponent name={name} />
    </Card>
  );
}
