import React, { ReactNode, createContext } from 'react';
import { waitFor, act, renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CalloutContext } from '@folio/stripes/core';
import useAutomaticSchedulerMutation from './useAutomaticSchedulerMutation';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';

const getMock = jest.fn();
const postMock = jest.fn();
const putMock = jest.fn();

jest.mock('@folio/stripes/core', () => ({
  CalloutContext: createContext(null),
  useOkapiKy: () => ({
    get: getMock,
    post: postMock,
    put: putMock,
  }),
}));

describe('Automatic scheduling mutation', () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    putMock.mockReset();
  });

  const contextMock = jest.fn();
  const wrapper = ({ children }: { children: ReactNode }) => withIntlConfiguration(
    <QueryClientProvider client={new QueryClient()}>
      <CalloutContext.Provider value={{ sendCallout: contextMock }}>{children}</CalloutContext.Provider>
    </QueryClientProvider>,
  );

  it('handles successful responses', async () => {
    const { result: mutator } = renderHook(() => useAutomaticSchedulerMutation(), { wrapper });

    postMock.mockReturnValueOnce(Promise.resolve({}));

    act(() => {
      mutator.current({
        bursar: 'bursar data',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    await waitFor(() => expect(postMock).toHaveBeenLastCalledWith('data-export-spring/configs', {
      json: {
        type: 'BURSAR_FEES_FINES',
        exportTypeSpecificParameters: { bursarFeeFines: 'bursar data' },
        schedulingData: 'is here!',
      },
    }));

    await waitFor(() => expect(contextMock).toHaveBeenLastCalledWith({
      type: 'success',
      message: 'Configuration saved',
    }));
  });

  it('handles error responses', async () => {
    const { result: mutator } = renderHook(() => useAutomaticSchedulerMutation(), { wrapper });

    postMock.mockReturnValueOnce(Promise.reject(new Error()));

    act(() => {
      mutator.current({
        bursar: 'bursar data that fails',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    await waitFor(() => expect(postMock).toHaveBeenLastCalledWith('data-export-spring/configs', {
      json: {
        type: 'BURSAR_FEES_FINES',
        exportTypeSpecificParameters: {
          bursarFeeFines: 'bursar data that fails',
        },
        schedulingData: 'is here!',
      },
    }));

    await waitFor(() => expect(contextMock).toHaveBeenLastCalledWith({
      type: 'error',
      message: 'Failed to save job',
    }));
  });

  it('calls post when no initial config is available', async () => {
    getMock.mockReturnValue({
      json: () => {
        return Promise.resolve({ totalRecords: 0 });
      },
    });

    const { result: mutator } = renderHook(() => useAutomaticSchedulerMutation(), { wrapper });

    postMock.mockReturnValueOnce(Promise.resolve({}));

    // ensure query loads
    await waitFor(() => expect(getMock).toHaveBeenCalled());

    act(() => {
      mutator.current({
        bursar: 'bursar data',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    await waitFor(() => expect(postMock).toHaveBeenCalled());
    expect(putMock).not.toHaveBeenCalled();

    // check invalidation
    await waitFor(() => expect(getMock).toHaveBeenCalledTimes(2));
  });

  it('calls put when initial data is returned', async () => {
    getMock.mockReturnValue({
      json: () => {
        return Promise.resolve({ totalRecords: 1, configs: [{ id: 'foo' }] });
      },
    });

    const { result: mutator } = renderHook(() => useAutomaticSchedulerMutation(), { wrapper });

    // ensure query loads
    postMock.mockReturnValueOnce(Promise.resolve({}));

    await waitFor(() => expect(getMock).toHaveBeenCalled());

    act(() => {
      mutator.current({
        bursar: 'bursar data',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    waitFor(async () => expect(putMock).toHaveBeenCalledWith('data-export-spring/configs/foo', {
      json: {
        id: 'foo',
        exportTypeSpecificParameters: { bursarFeeFines: 'bursar data' },
        schedulingData: 'is here!',
      },
    }));
    expect(postMock).not.toHaveBeenCalled();

    // check invalidation
    await waitFor(() => expect(getMock).toHaveBeenCalledTimes(2));
  });
});
