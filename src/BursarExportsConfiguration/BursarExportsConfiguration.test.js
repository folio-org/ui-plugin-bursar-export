import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { BursarExportsConfiguration } from './BursarExportsConfiguration';
import { SCHEDULE_PERIODS } from './constants';

jest.mock('./BursarItemsField', () => ({
  BursarItemsField: () => 'BursarItemsField',
}));
jest.mock('./FeeFineOwnerField', () => ({
  FeeFineOwnerField: () => 'FeeFineOwnerField',
}));
jest.mock('./TransferAccountField', () => ({
  TransferAccountField: () => 'TransferAccountField',
}));

const defaultProps = {
  onFormStateChanged: jest.fn(),
  onSubmit: jest.fn(),
  patronGroups: [{
    id: 'groupId',
    group: 'group',
  }],
  initialValues: {
    schedulePeriod: SCHEDULE_PERIODS.none,
  },
};

const renderBursarExportsConfiguration = (props = {}) => render(
  <MemoryRouter>
    <BursarExportsConfiguration {...defaultProps} {...props} />
  </MemoryRouter>,
);

describe('BursarExportsConfiguration', () => {
  it('should render schedule period field', () => {
    const { getByText } = renderBursarExportsConfiguration();

    expect(getByText('ui-plugin-bursar-export.bursarExports.schedulePeriod')).toBeDefined();
  });

  it('should render job parameter fields', () => {
    const { queryByText } = renderBursarExportsConfiguration({
      initialValues: {
        schedulePeriod: SCHEDULE_PERIODS.weeks,
      },
    });

    expect(queryByText('ui-plugin-bursar-export.bursarExports.daysOutstanding')).not.toBeNull();
    expect(queryByText('ui-plugin-bursar-export.bursarExports.patronGroups')).not.toBeNull();
  });

  it('should render owner field', () => {
    const { queryByText } = renderBursarExportsConfiguration();

    expect(queryByText('FeeFineOwnerField')).not.toBeNull();
  });

  it('should render transfer account field', () => {
    const { queryByText } = renderBursarExportsConfiguration();

    expect(queryByText('TransferAccountField')).not.toBeNull();
  });

  it('should render item types field', () => {
    const { queryByText } = renderBursarExportsConfiguration();

    expect(queryByText('BursarItemsField')).not.toBeNull();
  });

  describe('None period', () => {
    it('should should define schedule frequency when period is changed from None', () => {
      const { getByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.none,
        },
      });

      user.selectOptions(getByTestId('schedule-period'), SCHEDULE_PERIODS.days);

      const schedulePeriodField = getByTestId('schedule-frequency');

      expect(schedulePeriodField).toBeDefined();
      expect(schedulePeriodField.value).toBeDefined();
    });

    it('should reset scheduleFrequency when period is changed to None', () => {
      const { queryByTestId, getByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.days,
        },
      });

      user.selectOptions(getByTestId('schedule-period'), SCHEDULE_PERIODS.none);

      expect(queryByTestId('schedule-frequency')).toBeNull();
    });

    it('should reset scheduleTime when period is changed to None', () => {
      const { queryByText, getByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.days,
        },
      });

      user.selectOptions(getByTestId('schedule-period'), SCHEDULE_PERIODS.none);

      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleTime')).toBeNull();
    });
  });

  describe('Hours period', () => {
    it('should should display frequency field', () => {
      const { queryByText, queryByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.hours,
        },
      });

      expect(queryByTestId('schedule-frequency')).not.toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleTime')).toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleWeekdays')).toBeNull();
    });

    it('should reset scheduleTime when period is changed to Hours', () => {
      const { queryByText, getByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.days,
        },
      });

      user.selectOptions(getByTestId('schedule-period'), SCHEDULE_PERIODS.hours);

      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleTime')).toBeNull();
    });
  });

  describe('Days period', () => {
    it('should should display frequency and time fields', () => {
      const { queryByText, queryByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.days,
          patronGroups: [],
        },
      });

      expect(queryByTestId('schedule-frequency')).not.toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleTime')).not.toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleWeekdays')).toBeNull();
    });
  });

  describe('Weeks period', () => {
    it('should should display frequency, time and weekdays fields', () => {
      const { queryByText, queryByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.weeks,
        },
        weekDays: {
          'day': false,
        },
      });

      expect(queryByTestId('schedule-frequency')).not.toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleTime')).not.toBeNull();
      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleWeekdays')).not.toBeNull();
    });

    it('should reset scheduleWeekdays when period is changed to any periods', () => {
      const { queryByText, getByTestId } = renderBursarExportsConfiguration({
        initialValues: {
          schedulePeriod: SCHEDULE_PERIODS.weeks,
        },
      });

      user.selectOptions(getByTestId('schedule-period'), SCHEDULE_PERIODS.hours);

      expect(queryByText('ui-plugin-bursar-export.bursarExports.scheduleWeekdays')).toBeNull();
    });
  });
});
