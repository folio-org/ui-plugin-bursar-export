import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import {
  useBursarExportSceduler,
} from '../apiQuery';
import { BursarExportsManualRunner } from './BursarExportsManualRunner';

jest.mock('../apiQuery', () => {
  return {
    useBursarExportSceduler: jest.fn(),
  };
});

const renderBursarExportsManualRunner = () => render(<BursarExportsManualRunner disabled={false} />);

describe('BursarExportsManualRunner', () => {
  beforeEach(() => {
    useBursarExportSceduler.mockReturnValue({
      scheduleBursarExport: jest.fn(),
    });
  });

  it('should call query action when button is pressed', () => {
    const scheduleBursarExport = jest.fn();

    useBursarExportSceduler.mockReturnValue({ scheduleBursarExport });

    const { getByText } = renderBursarExportsManualRunner();

    user.click(getByText('ui-plugin-bursar-export.bursarExports.runManually'));

    expect(scheduleBursarExport).toHaveBeenCalled();
  });
});
