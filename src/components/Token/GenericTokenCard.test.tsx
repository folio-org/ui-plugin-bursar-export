import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import GenericTokenCard from './GenericTokenCard';

describe('Generic token card', () => {
  it('Shows length control when state is true and length control is available', () => {
    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={() => ({})}
          initialValues={{ test: [{ lengthControl: { drawerOpen: true } }] }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <GenericTokenCard<'test'>
                fieldArrayName="test"
                name="test[0]"
                index={0}
                isLast
                SelectComponent={() => null}
                BodyComponent={() => null}
                isBodyEmpty={() => true}
                shouldHaveLengthControl={() => true}
              />
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('textbox')).toBeVisible();
  });

  it.each([
    [undefined, true],
    [undefined, false],
    [true, false],
    [false, true],
    [false, false],
  ])(
    'Does not show length control when state is %s and length control is %s available',
    (state, available) => {
      render(
        withIntlConfiguration(
          <Form
            mutators={{ ...arrayMutators }}
            onSubmit={() => ({})}
            initialValues={{ test: [{ lengthControl: { drawerOpen: state } }] }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <GenericTokenCard<'test'>
                  fieldArrayName="test"
                  name="test[0]"
                  index={0}
                  isLast
                  SelectComponent={() => null}
                  BodyComponent={() => null}
                  isBodyEmpty={() => true}
                  shouldHaveLengthControl={() => available}
                />
              </form>
            )}
          </Form>
        )
      );

      expect(screen.queryByRole('textbox')).toBeNull();
    }
  );
});
