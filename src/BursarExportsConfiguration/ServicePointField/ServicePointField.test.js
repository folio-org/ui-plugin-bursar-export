import React from 'react';
import { render } from '@testing-library/react';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useOwnerServicePointsQuery } from './useOwnerServicePointsQuery';
import { ServicePointField } from './ServicePointField';

jest.mock('@folio/stripes-acq-components', () => ({
  FieldSelectFinal: jest.fn(() => 'FieldSelectFinal'),
}));

jest.mock('./useOwnerServicePointsQuery', () => ({
  useOwnerServicePointsQuery: jest.fn().mockReturnValue({ servicePoints: [] }),
}));

const renderServicePointField = (ownerId, onChange = jest.fn()) => render(
  <ServicePointField ownerId={ownerId} onChange={onChange} />,
);

describe('ServicePointField', () => {
  beforeEach(() => {
    FieldSelectFinal.mockClear();
  });

  it('should render FieldSelectFinal', () => {
    renderServicePointField();

    expect(FieldSelectFinal).toHaveBeenCalled();
  });

  it('should not be disabled when ownerId is passed', () => {
    renderServicePointField('ownerId');

    expect(FieldSelectFinal.mock.calls[0][0].disabled).toBeFalsy();
  });

  it('should be disabled when ownerId is not passed', () => {
    renderServicePointField();

    expect(FieldSelectFinal.mock.calls[0][0].disabled).toBeTruthy();
  });

  it('should use transfer accounts as data options', () => {
    const dataOptions = [{ label: 'Service Point', value: 'id' }];

    useOwnerServicePointsQuery.mockClear().mockReturnValue({
      servicePoints: dataOptions,
    });

    renderServicePointField('ownerId');

    expect(FieldSelectFinal.mock.calls[0][0].dataOptions).toEqual(dataOptions);
  });
});
