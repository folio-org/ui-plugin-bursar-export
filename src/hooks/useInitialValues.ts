import { useStripes } from '@folio/stripes/core';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import dtoToFormValues from '../api/dto/from';
import { useCurrentConfig, useFeeFineTypes, useLocations, useTransferAccounts } from '../api/queries';
import { FormValues } from '../types';
import useLocaleWeekdays from './useLocaleWeekdays';

export default function useInitialValues() {
  const currentConfig = useCurrentConfig();

  const feeFineTypes = useFeeFineTypes();
  const locations = useLocations();
  const transferAccounts = useTransferAccounts();

  const localeWeekdays = useLocaleWeekdays(useIntl());

  const stripes = useStripes();
  const intl = useIntl();

  const [initialValues, setInitialValues] = useState<Partial<FormValues> | null>(null);

  // this must go in an effect since, otherwise, the form will be reset on query fetch (which happens when selecting certain data/criteria)
  useEffect(() => {
    if (initialValues !== null) {
      return;
    }

    if (!currentConfig.isSuccess || !feeFineTypes.isSuccess || !locations.isSuccess || !transferAccounts.isSuccess) {
      return;
    }
    try {
      setInitialValues(
        dtoToFormValues(currentConfig.data, localeWeekdays, feeFineTypes.data, locations.data, transferAccounts.data, stripes, intl)
      );
    } catch (e) {
      console.error('Unable to load initial values', e);
    }
  }, [
    currentConfig.isSuccess,
    localeWeekdays,
    feeFineTypes.isSuccess,
    locations.isSuccess,
    transferAccounts.isSuccess,
    initialValues,
    currentConfig.data,
    feeFineTypes.data,
    locations.data,
    transferAccounts.data,
    stripes,
    intl,
  ]);

  return initialValues;
}
