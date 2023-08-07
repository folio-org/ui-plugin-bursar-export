import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import {
  CriteriaTerminalType,
  ComparisonOperator,
  CriteriaGroupType,
} from '../types/CriteriaTypes';
import { DataTokenType } from '../types/TokenTypes';
import DataTokenCardBody from './Token/Data/DataTokenCardBody';
describe('Conditional card (via constant conditional)', () => {
  describe('buttons work as expected', () => {
    const submitter = jest.fn();

    beforeEach(() => {
      render(
        withIntlConfiguration(
          <Form
            mutators={{ ...arrayMutators }}
            onSubmit={(v) => submitter(v)}
            initialValues={{
              test: {
                type: DataTokenType.CONSTANT_CONDITIONAL,
                conditions: [
                  {
                    type: CriteriaTerminalType.AGE,
                    operator: ComparisonOperator.GREATER_THAN,
                    numDays: '10',
                    value: 'if value 1',
                  },
                  {
                    type: CriteriaTerminalType.AMOUNT,
                    operator: ComparisonOperator.GREATER_THAN,
                    amountDollars: '20',
                    value: 'if value 2',
                  },
                ],
                else: 'fallback else',
              },
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DataTokenCardBody name="test" />
                <button type="submit">Submit</button>
              </form>
            )}
          </Form>
        )
      );
    });

    it('delete works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'trash' })[2]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaTerminalType.AGE,
              operator: ComparisonOperator.GREATER_THAN,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });

    it('reorder up works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'caret-up' })[1]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaTerminalType.AMOUNT,
              operator: ComparisonOperator.GREATER_THAN,
              amountDollars: '20',
              value: 'if value 2',
            },
            {
              type: CriteriaTerminalType.AGE,
              operator: ComparisonOperator.GREATER_THAN,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });

    it('reorder down works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'caret-down' })[0]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaTerminalType.AMOUNT,
              operator: ComparisonOperator.GREATER_THAN,
              amountDollars: '20',
              value: 'if value 2',
            },
            {
              type: CriteriaTerminalType.AGE,
              operator: ComparisonOperator.GREATER_THAN,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });
  });
});
