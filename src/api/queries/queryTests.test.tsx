import { act, renderHook, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useLocations from './useLocations';
import usePatronGroups from './usePatronGroups';
import useServicePoints from './useServicePoints';
import useFeeFineTypes from './useFeeFineTypes';
import useFeeFineOwners from './useFeeFineOwners';
import useTransferAccounts from './useTransferAccounts';
import useInstitutions from './useInstitutions';
import useCampuses from './useCampuses';
import useLibraries from './useLibraries';
import useCurrentConfig from './useCurrentConfig';

const responseMock = jest.fn();
const kyMock = jest.fn(() => ({
  json: () => {
    return Promise.resolve(responseMock());
  },
}));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    get: kyMock,
  }),
}));

describe('API Query Tests', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => queryClient.clear());

  it('Patron groups query works as expected', async () => {
    responseMock.mockResolvedValue({
      usergroups: [
        { id: '1', group: 'staff' },
        { id: '2', group: 'undergraduate' },
      ],
    });

    const { result } = renderHook(() => usePatronGroups(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith('groups?limit=2147483647');
    expect(result.current.data).toStrictEqual([
      { id: '1', group: 'staff' },
      { id: '2', group: 'undergraduate' },
    ]);
  });

  it('Service points query works as expected', async () => {
    responseMock.mockResolvedValue({
      servicepoints: [
        { id: '1', name: 'Circ desk 1' },
        { id: '2', name: 'Online' },
      ],
    });

    const { result } = renderHook(() => useServicePoints(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'service-points?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      { id: '1', name: 'Circ desk 1' },
      { id: '2', name: 'Online' },
    ]);
  });

  it('Locations query works as expected', async () => {
    responseMock.mockResolvedValue({
      locations: [
        {
          id: '1',
          name: 'Popular Reading Collection',
          code: 'KU/CC/DI/P',
        },
        {
          id: '2',
          name: 'Online',
          code: 'E',
        },
        {
          id: '3',
          name: 'SECOND FLOOR',
          code: 'KU/CC/DI/2',
        },
        {
          id: '4',
          name: 'Annex',
          code: 'KU/CC/DI/A',
        },
      ],
    });

    const { result } = renderHook(() => useLocations(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'locations?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '1',
        name: 'Popular Reading Collection',
        code: 'KU/CC/DI/P',
      },
      {
        id: '2',
        name: 'Online',
        code: 'E',
      },
      {
        id: '3',
        name: 'SECOND FLOOR',
        code: 'KU/CC/DI/2',
      },
      {
        id: '4',
        name: 'Annex',
        code: 'KU/CC/DI/A',
      },
    ]);
  });

  it('Fee fine owners query works as expected', async () => {
    responseMock.mockResolvedValue({
      owners: [
        {
          id: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          owner: 'Owner 1',
        },
        {
          id: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
          owner: 'Owner 2',
        },
        {
          id: '4ae65faa-8df7-4fbc-a4db-ccdcc1479b10',
          owner: 'Shared',
          servicePointOwner: [],
        },
      ],
    });

    const { result } = renderHook(() => useFeeFineOwners(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'owners?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
        owner: 'Owner 1',
      },
      {
        id: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
        owner: 'Owner 2',
      },
      {
        id: '4ae65faa-8df7-4fbc-a4db-ccdcc1479b10',
        owner: 'Shared',
        servicePointOwner: [],
      },
    ]);
  });

  it('Fee fine types query works as expected', async () => {
    responseMock.mockResolvedValue({
      feefines: [
        {
          id: '9523cb96-e752-40c2-89da-60f3961a488d',
          feeFineType: 'Overdue fine',
          automatic: true,
        },
        {
          id: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
          feeFineType: 'Lost item fee',
          automatic: true,
        },
        {
          id: '49223209-4d06-4bb5-8b7e-d0b7e5b8fb10',
          ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          feeFineType: 'Type 1',
          automatic: false,
        },
      ],
    });

    const { result } = renderHook(() => useFeeFineTypes(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'feefines?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '9523cb96-e752-40c2-89da-60f3961a488d',
        feeFineType: 'Overdue fine',
        automatic: true,
      },
      {
        id: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
        feeFineType: 'Lost item fee',
        automatic: true,
      },
      {
        id: '49223209-4d06-4bb5-8b7e-d0b7e5b8fb10',
        ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
        feeFineType: 'Type 1',
        automatic: false,
      },
    ]);
  });

  it('Fee fine transfer accounts query works as expected', async () => {
    responseMock.mockResolvedValue({
      transfers: [
        {
          accountName: 'test account 1',
          ownerId: 'b25fd8e7-a0e7-4690-ab0b-94039739c0db',
          id: '90c1820f-60bf-4b9a-99f5-d677ea78ddca',
        },
        {
          accountName: 'test account 2',
          ownerId: '60f7a273-1454-4a5d-b379-1f323a74e3f1',
          id: 'bb58346b-4025-4236-a0a6-5476eb972066',
        },
      ],
    });

    const { result } = renderHook(() => useTransferAccounts(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'transfers?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        accountName: 'test account 1',
        ownerId: 'b25fd8e7-a0e7-4690-ab0b-94039739c0db',
        id: '90c1820f-60bf-4b9a-99f5-d677ea78ddca',
      },
      {
        accountName: 'test account 2',
        ownerId: '60f7a273-1454-4a5d-b379-1f323a74e3f1',
        id: 'bb58346b-4025-4236-a0a6-5476eb972066',
      },
    ]);
  });

  it('Institutions query works as expected', async () => {
    responseMock.mockResolvedValue({
      locinsts: [
        {
          id: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
          name: 'Københavns Universitet',
          code: 'KU',
        },
      ],
    });

    const { result } = renderHook(() => useInstitutions(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'location-units/institutions?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        name: 'Københavns Universitet',
        code: 'KU',
      },
    ]);
  });

  it('Campuses query works as expected', async () => {
    responseMock.mockResolvedValue({
      loccamps: [
        {
          id: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
          name: 'City Campus',
          code: 'CC',
          institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        },
        {
          id: '470ff1dd-937a-4195-bf9e-06bcfcd135df',
          name: 'Online',
          code: 'E',
          institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        },
      ],
    });

    const { result } = renderHook(() => useCampuses(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'location-units/campuses?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
        name: 'City Campus',
        code: 'CC',
        institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
      },
      {
        id: '470ff1dd-937a-4195-bf9e-06bcfcd135df',
        name: 'Online',
        code: 'E',
        institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
      },
    ]);
  });

  it('Libraries query works as expected', async () => {
    responseMock.mockResolvedValue({
      loclibs: [
        {
          id: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
          name: 'Datalogisk Institut',
          code: 'DI',
          campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
        },
        {
          id: 'c2549bb4-19c7-4fcc-8b52-39e612fb7dbe',
          name: 'Online',
          code: 'E',
          campusId: '470ff1dd-937a-4195-bf9e-06bcfcd135df',
        },
      ],
    });

    const { result } = renderHook(() => useLibraries(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(kyMock).toHaveBeenCalledWith(
      'location-units/libraries?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
        name: 'Datalogisk Institut',
        code: 'DI',
        campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
      },
      {
        id: 'c2549bb4-19c7-4fcc-8b52-39e612fb7dbe',
        name: 'Online',
        code: 'E',
        campusId: '470ff1dd-937a-4195-bf9e-06bcfcd135df',
      },
    ]);
  });

  it.each([
    [undefined, null],
    [[], null],
    [[{ id: 'foo' }], { id: 'foo' }],
  ])(
    'Current config query with response %s gives %s',
    async (configs, expected) => {
      responseMock.mockResolvedValue({
        configs,
      });

      const { result } = renderHook(() => useCurrentConfig(), {
        wrapper,
      });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(kyMock).toHaveBeenCalledWith('data-export-spring/configs', {
        searchParams: { limit: 1, query: 'type==BURSAR_FEES_FINES' },
      });
      expect(result.current.data).toStrictEqual(expected);
    }
  );
});
