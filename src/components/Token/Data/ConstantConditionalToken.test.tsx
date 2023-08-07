import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import {
  ComparisonOperator,
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody from './DataTokenCardBody';

describe('Constant conditional token', () => {
  it('add works as expected', async () => {
    const submitter = jest.fn();

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

    await userEvent.click(
      screen.getByRole('button', { name: 'Add condition' })
    );
    await userEvent.type(
      screen.getAllByRole('textbox', { name: 'Then use:' })[2],
      'if value 3'
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: [
          {
            type: CriteriaTerminalType.AGE,
            numDays: '10',
            value: 'if value 1',
          },
          {
            type: CriteriaTerminalType.AMOUNT,
            operator: ComparisonOperator.GREATER_THAN,
            amountDollars: '20',
            value: 'if value 2',
          },
          {
            type: CriteriaGroupType.ALL_OF,
            value: 'if value 3',
          },
        ],
        else: 'fallback else',
      },
    });
  });

  describe('aggregate is respected', () => {
    test.each([
      [undefined, true],
      [true, false],
      [false, true],
    ])(
      'if aggregate=%s then item/etc options should be present=%s',
      (aggregate, shouldHaveNonAggregateCriteria) => {
        render(
          withIntlConfiguration(
            <Form
              mutators={{ ...arrayMutators }}
              onSubmit={jest.fn()}
              initialValues={{
                aggregate,
                test: {
                  type: DataTokenType.CONSTANT_CONDITIONAL,
                  conditions: [
                    {
                      type: CriteriaTerminalType.AGE,
                      numDays: '10',
                      value: 'if value 1',
                    },
                  ],
                  else: 'fallback else',
                },
              }}
            >
              {() => <DataTokenCardBody name="test" />}
            </Form>
          )
        );

        if (shouldHaveNonAggregateCriteria) {
          expect(
            screen.getByRole('option', { name: 'Item location' })
          ).toBeInTheDocument();
        } else {
          expect(
            screen.queryByRole('option', { name: 'Item location' })
          ).toBeNull();
        }
      }
    );
  });
});
