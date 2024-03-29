import { Button, Card } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { CriteriaTerminalType } from '../../types';
import ConditionalCard from '../ConditionalCard';
import TransferAccountFields from '../TransferAccountFields';
import css from './TransferInfoSection.module.css';

export default function TransferInfoSection() {
  return (
    <FieldArray name="transferInfo.conditions">
      {({ fields }) => (
        <>
          {fields.map((name, index) => (
            <ConditionalCard
              key={name}
              index={index}
              fieldArrayName="transferInfo.conditions"
              conditionName={`${name}.condition`}
            >
              <TransferAccountFields prefix={`${name}.`} />
            </ConditionalCard>
          ))}

          <Card
            headerStart={
              fields.length ? (
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.otherwise" />
              ) : (
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.transferTo" />
              )
            }
          >
            <TransferAccountFields prefix="transferInfo.else." />
          </Card>

          <Button
            onClick={() => fields.push({
              condition: { type: CriteriaTerminalType.PATRON_GROUP },
            })}
          >
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.addCondition" />
          </Button>

          {!!fields.length && (
            <p className={css.evaluationDescription}>
              <i>
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.description" />
              </i>
            </p>
          )}
        </>
      )}
    </FieldArray>
  );
}
