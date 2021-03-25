import React from 'react';
import { render } from '@testing-library/react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { BursarItemsField } from './BursarItemsField';
import { useOwnerFeeFinesQuery } from './useOwnerFeeFinesQuery';

jest.mock('./useOwnerFeeFinesQuery', () => ({
  useOwnerFeeFinesQuery: jest.fn().mockReturnValue({ feeFines: [] }),
}));

const renderBursarItemsField = (value = []) => render(
  <Form
    onSubmit={jest.fn()}
    mutators={{
      changeBursarItems: (args, state, utils) => {
        utils.changeValue(
          state,
          'exportTypeSpecificParameters.bursarFeeFines.typeMappings',
          () => args[0],
        );
      },
      ...arrayMutators,
    }}
    render={(props) => (
      <BursarItemsField
        ownerId="ownerId"
        value={value}
        onChange={props.form.mutators.changeBursarItems}
      />
    )}
  />,
);

describe('BursarItemsField', () => {
  it('should not render list when no feeFines', () => {
    const { queryByText } = renderBursarItemsField();

    expect(queryByText('ui-plugin-bursar-export.bursarExports.itemTypes')).toBeNull();
  });

  it('should render item type fields when there are feeFines', () => {
    useOwnerFeeFinesQuery.mockClear().mockReturnValue({
      feeFines: [{ id: 'feeFines' }],
    });

    const { getByText } = renderBursarItemsField();

    expect(getByText('ui-plugin-bursar-export.bursarExports.itemTypes')).toBeDefined();
  });
});
