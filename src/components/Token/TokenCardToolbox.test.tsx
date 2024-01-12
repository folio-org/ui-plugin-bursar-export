import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import TokenCardToolbox from './TokenCardToolbox';

describe('Token card toolbox', () => {
  it('handles delete button', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: ['a', 'b', 'c'],
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TokenCardToolbox
                fieldArrayName={'test'}
                name={'test[1]'}
                index={1}
                isLast
                showLengthControl={false}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    await userEvent.click(screen.getByRole('button', { name: 'trash' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({ test: ['a', 'c'] });
  });

  it('handles up/down buttons', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: ['a', 'b', 'c'],
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TokenCardToolbox
                fieldArrayName={'test'}
                name={'test[1]'}
                index={1}
                isLast={false}
                showLengthControl={false}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    await userEvent.click(screen.getByRole('button', { name: 'caret-up' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({ test: ['b', 'a', 'c'] });

    await userEvent.click(screen.getByRole('button', { name: 'caret-down' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({ test: ['b', 'c', 'a'] });
  });

  it('first has disabled up arrow', () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: ['a', 'b', 'c'],
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TokenCardToolbox
                fieldArrayName={'test'}
                name={'test[0]'}
                index={0}
                isLast={false}
                showLengthControl={false}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('button', { name: 'caret-up' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'caret-down' })
    ).not.toBeDisabled();
    expect(screen.queryByRole('button', { name: 'gear' })).toBeNull();
  });

  it('last has disabled down arrow', () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: ['a', 'b', 'c'],
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TokenCardToolbox
                fieldArrayName={'test'}
                name={'test[2]'}
                index={2}
                isLast
                showLengthControl
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('button', { name: 'caret-up' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'caret-down' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'gear' })).toBeVisible();
  });

  it('length control button works', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: [{}],
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TokenCardToolbox
                fieldArrayName={'test'}
                name={'test[0]'}
                index={0}
                isLast
                showLengthControl
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    await userEvent.click(screen.getByRole('button', { name: 'gear' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: [{ lengthControl: { drawerOpen: true } }],
    });

    await userEvent.click(screen.getByRole('button', { name: 'gear' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: [{ lengthControl: { drawerOpen: false } }],
    });

    await userEvent.click(screen.getByRole('button', { name: 'gear' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: [{ lengthControl: { drawerOpen: true } }],
    });
  });
});
