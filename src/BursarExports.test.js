import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { BursarExports } from './BursarExports';

const BursarExportsConfiguration = 'BursarExportsConfiguration';

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

const renderBursarExports = () => render(<BursarExports />);

describe('BursarExports', () => {
  it('should render configuration form', () => {
    const { getByText } = renderBursarExports();

    expect(getByText(BursarExportsConfiguration)).toBeDefined();
  });

  it('should render save button', () => {
    const { getByText } = renderBursarExports();

    expect(getByText('ui-plugin-bursar-export.bursarExports.save')).toBeDefined();
  });
});
