import React from 'react';
import { render } from '@testing-library/react';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useFeeFineOwnersQuery } from './useFeeFineOwnersQuery';
import { FeeFineOwnerField } from './FeeFineOwnerField';

jest.mock('@folio/stripes-acq-components', () => ({
  FieldSelectFinal: jest.fn(() => 'FieldSelectFinal'),
}));

jest.mock('./useFeeFineOwnersQuery', () => ({
  useFeeFineOwnersQuery: jest.fn().mockReturnValue({ owners: [] }),
}));

const renderOwnerField = (onChange = jest.fn()) => render(
  <FeeFineOwnerField onChange={onChange} />,
);

describe('FeeFineOwnerField', () => {
  beforeEach(() => {
    FieldSelectFinal.mockClear();
  });

  it('should render FieldSelectFinal', () => {
    renderOwnerField();

    expect(FieldSelectFinal).toHaveBeenCalled();
  });

  it('should use owners as data options', () => {
    const dataOptions = [{ label: 'Owner', value: 'id' }];

    useFeeFineOwnersQuery.mockClear().mockReturnValue({
      owners: dataOptions.map(o => ({
        id: o.value,
        owner: o.label,
      })),
    });

    renderOwnerField();

    expect(FieldSelectFinal.mock.calls[0][0].dataOptions).toEqual(dataOptions);
  });
});
