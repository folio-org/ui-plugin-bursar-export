import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import AggregateCriteriaCard from './AggregateCriteriaCard';
import { CriteriaAggregateType } from '../../types/CriteriaTypes';

describe('Aggregate criteria card', () => {
  const submitter = jest.fn();

  beforeEach(() => {
    render(
      withIntlConfiguration(
        <Form onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <AggregateCriteriaCard />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );
  });

  it('Treats pass as default', async () => {
    expect(screen.getByRole('combobox', { name: 'Filter type' })).toHaveValue(
      CriteriaAggregateType.PASS
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenCalledWith({
      aggregateFilter: {
        type: CriteriaAggregateType.PASS,
      },
    });
  });

  it('Pass has no extra boxes/options', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Filter type' }),
      CriteriaAggregateType.PASS
    );

    expect(
      screen.queryByRole('combobox', { name: 'Comparison operator' })
    ).toBeNull();
    expect(screen.queryByRole('spinbutton')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('Quantity has operator and dollar amount', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Filter type' }),
      CriteriaAggregateType.NUM_ROWS
    );

    // find to allow for useField hook to update
    expect(
      await screen.findByRole('combobox', { name: 'Comparison operator' })
    ).toBeVisible();
    expect(screen.getByRole('spinbutton')).toBeVisible();

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Comparison operator' }),
      'Less than but not equal to'
    );
    await userEvent.type(screen.getByRole('spinbutton'), '15');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenCalledWith({
      aggregateFilter: {
        type: CriteriaAggregateType.NUM_ROWS,
        operator: 'LESS_THAN',
        amount: '15',
      },
    });
  });

  it('Amount has operator and dollar amount', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Filter type' }),
      CriteriaAggregateType.TOTAL_AMOUNT
    );

    // find to allow for useField hook to update
    expect(
      await screen.findByRole('combobox', { name: 'Comparison operator' })
    ).toBeVisible();
    expect(screen.getByRole('spinbutton')).toBeVisible();

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Comparison operator' }),
      'Greater than or equal to'
    );
    await userEvent.type(screen.getByRole('spinbutton'), '10');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenCalledWith({
      aggregateFilter: {
        type: CriteriaAggregateType.TOTAL_AMOUNT,
        operator: 'GREATER_THAN_EQUAL',
        amountDollars: '10.00',
      },
    });
  });
});
