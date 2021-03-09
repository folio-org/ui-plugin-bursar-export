import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import {
  useBursarExportScheduler,
} from '../apiQuery';
import { BursarExportsManualRunner } from './BursarExportsManualRunner';

jest.mock('../apiQuery', () => {
  return {
    useBursarExportScheduler: jest.fn(),
  };
});

const defaultForm = {
  getState: () => ({ values: {} }),
};

const renderBursarExportsManualRunner = ({
  form = defaultForm,
} = {}) => render(<BursarExportsManualRunner form={form} disabled={false} />);

describe('BursarExportsManualRunner', () => {
  beforeEach(() => {
    useBursarExportScheduler.mockReturnValue({
      scheduleBursarExport: jest.fn(),
    });
  });

  it('should call query action with form params when button is pressed', () => {
    const scheduleBursarExport = jest.fn();
    const exportTypeSpecificParameters = {
      daysOutstanding: 2,
      patronGroups: ['saf-uis4-sdsa'],
    };

    useBursarExportScheduler.mockReturnValue({ scheduleBursarExport });

    const { getByText } = renderBursarExportsManualRunner({
      form: {
        getState: () => ({
          values: {
            exportTypeSpecificParameters,
          },
        }),
      },
    });

    user.click(getByText('ui-plugin-bursar-export.bursarExports.runManually'));

    expect(scheduleBursarExport).toHaveBeenCalledWith(exportTypeSpecificParameters);
  });
});
