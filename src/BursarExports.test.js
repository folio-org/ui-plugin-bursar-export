import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import {
  useBursarConfigQuery,
  useBursarConfigMutation,
} from './apiQuery';
import { BursarExports } from './BursarExports';

const BursarExportsConfiguration = 'BursarExportsConfiguration';
const BursarExportsManualRunner = 'BursarExportsManualRunner';

jest.mock('./apiQuery', () => {
  return {
    useBursarConfigQuery: jest.fn(),
    useBursarConfigMutation: jest.fn(),
    usePatronGroupsQuery: jest.fn().mockReturnValue({}),
  };
});

jest.mock('./BursarExportsConfiguration', () => {
  // eslint-disable-next-line global-require
  const { useEffect } = require('react');

  return {
    BursarExportsConfiguration: ({ onFormStateChanged, onSubmit }) => {
      useEffect(() => {
        onFormStateChanged({
          submit: onSubmit,
          getState: jest.fn(),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return BursarExportsConfiguration;
    },
  };
});

jest.mock('./BursarExportsManualRunner', () => {
  return {
    BursarExportsManualRunner: () => BursarExportsManualRunner,
  };
});

const renderBursarExports = () => render(<BursarExports />);

describe('BursarExports', () => {
  beforeEach(() => {
    useBursarConfigQuery.mockClear().mockReturnValue({
      isLoading: false,
      bursarConfig: {},
    });
    useBursarConfigMutation.mockReturnValue({
      mutateBursarConfig: jest.fn(),
    });
  });

  it('should render configuration form', () => {
    const { getByText } = renderBursarExports();

    expect(getByText(BursarExportsConfiguration)).toBeDefined();
  });

  it('should render run manually button', () => {
    const { getByText } = renderBursarExports();

    expect(getByText(BursarExportsManualRunner)).toBeDefined();
  });

  it('should render save button', () => {
    const { getByText } = renderBursarExports();

    expect(getByText('ui-plugin-bursar-export.bursarExports.save')).toBeDefined();
  });

  it('should not render form when config is fetching', () => {
    useBursarConfigQuery.mockClear().mockReturnValue({
      isLoading: true,
    });

    const { queryByText } = renderBursarExports();

    expect(queryByText(BursarExportsConfiguration)).toBeNull();
  });

  it('should call query mutator when form is submitted via save button', () => {
    const mutateBursarConfig = jest.fn();

    useBursarConfigMutation.mockReturnValue({ mutateBursarConfig });

    const { getByText } = renderBursarExports();

    user.click(getByText('ui-plugin-bursar-export.bursarExports.save'));

    expect(mutateBursarConfig).toHaveBeenCalled();
  });
});
