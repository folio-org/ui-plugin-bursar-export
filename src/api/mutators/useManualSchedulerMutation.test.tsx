import { CalloutContext } from '@folio/stripes/core';
import { waitFor, act, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useManualSchedulerMutation from './useManualSchedulerMutation';

const kyMock = jest.fn();

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    post: kyMock,
  }),
}));

describe('Automatic scheduling mutation', () => {
  const original = console.error;

  beforeAll(() => {
    console.error = jest.fn(); // hush when we do Promise.reject
  });

  afterAll(() => {
    console.error = original;
  });

  const contextMock = jest.fn();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      <CalloutContext.Provider value={{ sendCallout: contextMock }}>
        {children}
      </CalloutContext.Provider>
    </QueryClientProvider>
  );

  it('handles successful responses', async () => {
    const { result: mutator } = renderHook(() => useManualSchedulerMutation(), {
      wrapper,
    });

    kyMock.mockReturnValueOnce(Promise.resolve({}));

    act(() => {
      mutator.current('bursar data' as any);
    });

    await waitFor(() =>
      expect(kyMock).toHaveBeenLastCalledWith('data-export-spring/jobs', {
        json: {
          type: 'BURSAR_FEES_FINES',
          exportTypeSpecificParameters: { bursarFeeFines: 'bursar data' },
        },
      })
    );

    await waitFor(() =>
      expect(contextMock).toHaveBeenLastCalledWith({
        type: 'success',
        message: 'Job has been scheduled',
      })
    );
  });

  it('handles error responses', async () => {
    const { result: mutator } = renderHook(() => useManualSchedulerMutation(), {
      wrapper,
    });

    kyMock.mockReturnValueOnce(Promise.reject({}));

    act(() => {
      mutator.current('bursar data that fails' as any);
    });

    await waitFor(() =>
      expect(kyMock).toHaveBeenLastCalledWith('data-export-spring/jobs', {
        json: {
          type: 'BURSAR_FEES_FINES',
          exportTypeSpecificParameters: {
            bursarFeeFines: 'bursar data that fails',
          },
        },
      })
    );

    await waitFor(() =>
      expect(contextMock).toHaveBeenLastCalledWith({
        type: 'error',
        message: 'Failed to start job',
      })
    );
  });
});
