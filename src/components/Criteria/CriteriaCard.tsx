import { Card, Loading, Row } from '@folio/stripes/components';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../types/CriteriaTypes';
import CriteriaAge from './CriteriaAge';
import CriteriaAmount from './CriteriaAmount';
import css from '../Card.module.css';
import CriteriaCardSelect from './CriteriaCardSelect';
import CriteriaCardToolbox from './CriteriaCardToolbox';
import CriteriaFeeFineType from './CriteriaFeeFineType';
import CriteriaLocation from './CriteriaLocation';
import CriteriaPatronGroup from './CriteriaPatronGroup';
import CriteriaServicePoint from './CriteriaServicePoint';
import CriteriaFeeFineOwner from './CriteriaFeeFineOwner';

export default function CriteriaCard({
  name,
  onRemove,
  root = false,
  patronOnly = false,
  alone,
}: {
  name: string;
  onRemove?: () => void;
  root?: boolean;
  patronOnly?: boolean;
  alone: boolean;
}) {
  const type = useField<CriteriaGroupType | CriteriaTerminalType>(
    `${name}.type`,
    {
      subscription: { value: true },
      format: (value) => value ?? CriteriaTerminalType.PASS,
    }
  ).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case CriteriaTerminalType.PASS:
        return <div />;

      case CriteriaGroupType.ALL_OF:
      case CriteriaGroupType.ANY_OF:
      case CriteriaGroupType.NONE_OF:
        return (
          <FieldArray name={`${name}.criteria`}>
            {({ fields }) =>
              fields.map((innerName, index) => (
                <CriteriaCard
                  key={innerName}
                  name={innerName}
                  alone={fields.length === 1}
                  onRemove={() => fields.remove(index)}
                />
              ))
            }
          </FieldArray>
        );

      case CriteriaTerminalType.AGE:
        return (
          <Row>
            <CriteriaAge prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.AMOUNT:
        return (
          <Row>
            <CriteriaAmount prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.FEE_FINE_OWNER:
        return (
          <Row>
            <CriteriaFeeFineOwner prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.FEE_FINE_TYPE:
        return (
          <Row>
            <CriteriaFeeFineType prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.LOCATION:
        return (
          <Row>
            <CriteriaLocation prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.SERVICE_POINT:
        return (
          <Row>
            <CriteriaServicePoint prefix={`${name}.`} />
          </Row>
        );
      case CriteriaTerminalType.PATRON_GROUP:
        return (
          <Row>
            <CriteriaPatronGroup prefix={`${name}.`} />
          </Row>
        );

      default:
        return <Loading />;
    }
  }, [type]);

  return (
    <Card
      cardClass={css.cardClass}
      headerClass={css.headerClass}
      headerStart={
        <CriteriaCardSelect
          name={`${name}.type`}
          root={root}
          patronOnly={patronOnly}
        />
      }
      headerEnd={
        <CriteriaCardToolbox
          prefix={`${name}.`}
          root={root}
          alone={alone}
          onRemove={onRemove}
        />
      }
      bodyClass={classNames({
        [css.emptyBody]: type === CriteriaTerminalType.PASS,
      })}
    >
      {cardInterior}
    </Card>
  );
}
