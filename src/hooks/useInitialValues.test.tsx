import { renderHook, waitFor } from '@testing-library/react';
import useInitialValues from './useInitialValues';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import React from 'react';
import useFeeFineTypes from '../api/queries/useFeeFineTypes';
import useCurrentConfig from '../api/queries/useCurrentConfig';
import useLocations from '../api/queries/useLocations';
import useTransferAccounts from '../api/queries/useTransferAccounts';

jest.mock('../api/dto/from/dtoToFormValues', () => () => 'values');

jest.mock('../api/queries/useCurrentConfig');
jest.mock('../api/queries/useFeeFineTypes');
jest.mock('../api/queries/useLocations');
jest.mock('../api/queries/useTransferAccounts');

(useCurrentConfig as any).mockReturnValue({ isSuccess: false });
(useFeeFineTypes as any).mockReturnValue({ isSuccess: false });
(useLocations as any).mockReturnValue({ isSuccess: false });
(useTransferAccounts as any).mockReturnValue({ isSuccess: false });

test('initial values hook', async () => {
  const { result, rerender } = renderHook(() => useInitialValues(), {
    wrapper: ({ children }) => withIntlConfiguration(<div>{children}</div>),
  });

  await waitFor(() => expect(result.current).toBeNull());

  (useCurrentConfig as any).mockReturnValue({ isSuccess: true });
  rerender();
  expect(result.current).toBeNull();

  (useFeeFineTypes as any).mockReturnValue({ isSuccess: true });
  rerender();
  expect(result.current).toBeNull();

  (useLocations as any).mockReturnValue({ isSuccess: true });
  rerender();
  expect(result.current).toBeNull();

  (useTransferAccounts as any).mockReturnValue({ isSuccess: true });
  rerender();
  await waitFor(() => expect(result.current).toEqual('values'));

  // should not change back
  (useTransferAccounts as any).mockReturnValue({ isSuccess: false });
  rerender();
  await waitFor(() => expect(result.current).toEqual('values'));
});
