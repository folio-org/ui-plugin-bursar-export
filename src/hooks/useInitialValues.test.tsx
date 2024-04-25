import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import React from 'react';
import useInitialValues from './useInitialValues';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import { useFeeFineTypes, useCurrentConfig, useLocations, useTransferAccounts } from '../api/queries';

jest.mock('../api/dto/from', () => () => 'values');

jest.mock('../api/queries');
(useCurrentConfig as any).mockReturnValue({ isSuccess: false });
(useFeeFineTypes as any).mockReturnValue({ isSuccess: false });
(useLocations as any).mockReturnValue({ isSuccess: false });
(useTransferAccounts as any).mockReturnValue({ isSuccess: false });

describe('useInitialValues', () => {
  test('initial values hook', async () => {
    const { result, rerender } = renderHook(() => useInitialValues(), {
      wrapper: ({ children }: { children: React.ReactNode }) => withIntlConfiguration(<div>{children}</div>),
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

  test('initial values hook with invalid data', async () => {
    const { result, rerender } = renderHook(() => useInitialValues(), {
      wrapper: ({ children }: { children: React.ReactNode }) => withIntlConfiguration(<div>{children}</div>),
    });

    (useTransferAccounts as any).mockReturnValue({ isSuccess: false });

    // should be null on fail
    rerender();
    await waitFor(() => expect(result.current).toBeNull());

    (useTransferAccounts as any).mockReturnValue({ isSuccess: true });
    rerender();

    await waitFor(() => expect(result.current).toEqual('values'));
  });
});
