import React from 'react';
import { render } from '@testing-library/react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { BursarItemsField } from './BursarItemsField';
import { useOwnerFeeFinesQuery } from './useOwnerFeeFinesQuery';

jest.mock('../FeeFineOwnerField', () => ({
  useFeeFineOwnersQuery: jest.fn().mockReturnValue({ owners: [{ id: 'ownerId' }] }),
}));
jest.mock('./useOwnerFeeFinesQuery', () => ({
  useOwnerFeeFinesQuery: jest.fn().mockReturnValue({ feeFines: [] }),
}));

const renderBursarItemsField = () => render(
  <Form
    onSubmit={jest.fn()}
    mutators={{
      changeBursarItems: ([ownerId, transferTypes], state, utils) => {
        utils.changeValue(
          state,
          `exportTypeSpecificParameters.bursarFeeFines.typeMappings[${ownerId}]`,
          () => transferTypes,
        );
      },
      ...arrayMutators,
    }}
    render={(props) => (
      <BursarItemsField onChange={props.form.mutators.changeBursarItems} />
    )}
  />,
);

describe('BursarItemsField', () => {
  describe('Filter', () => {
    it('should display filter by owner', () => {
      const { getByText } = renderBursarItemsField();

      expect(getByText('ui-plugin-bursar-export.bursarExports.owner')).toBeDefined();
    });
  });

  it('should render item type fields', () => {
    const feeFines = [{ id: 'feeFines' }];

    useOwnerFeeFinesQuery.mockClear().mockImplementation(ownerId => ({
      feeFines: ownerId ? feeFines : [],
    }));

    const { getByText } = renderBursarItemsField();

    expect(getByText('ui-plugin-bursar-export.bursarExports.feeFineType')).toBeDefined();
  });
});
