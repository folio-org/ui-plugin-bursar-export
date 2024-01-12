import { Button, Card } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import ConditionalCard from '../../components/ConditionalCard';
import TransferAccountFields from '../../components/TransferAccountFields';
import { CriteriaTerminalType } from '../../types/CriteriaTypes';
import { FormattedMessage } from 'react-intl';

export default function TransferInfoMenu() {
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
            onClick={() =>
              fields.push({
                condition: { type: CriteriaTerminalType.PATRON_GROUP },
              })
            }
          >
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.addCondition" />
          </Button>

          <p style={{ margin: 0, display: fields.length ? 'block' : 'none' }}>
            <i>
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.description" />
            </i>
          </p>
        </>
      )}
    </FieldArray>
  );
}
