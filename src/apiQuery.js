import {
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { SCHEDULE_PERIODS } from './BursarExportsConfiguration';

const bursarConfigApi = 'bursar-export/config';
const bursarConfigKey = 'bursarConfig';

export const useBursarConfigQuery = (key = bursarConfigKey) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: 1,
        },
      };
      const { configs = [] } = await ky.get(bursarConfigApi, kyOptions).json();

      return configs[0] || {
        schedulePeriod: SCHEDULE_PERIODS.none,
      };
    },
  });

  return {
    isLoading,
    bursarConfig: {
      ...data,
      weekDays: data.weekDays?.reduce((acc, weekDay) => ({
        ...acc,
        [weekDay.toLowerCase()]: true,
      }), {}),
    },
  };
};

export const useBursarConfigMutation = (options = {}, key = bursarConfigKey) => {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (bursarConfig) => {
      const { weekDays = {} } = bursarConfig;

      const json = {
        ...bursarConfig,
        weekDays: Object.keys(weekDays)
          .filter(weekDay => weekDays[weekDay])
          .map(weekDay => weekDay.toUpperCase()),
      };

      const kyMethod = bursarConfig.id ? 'put' : 'post';
      const kyPath = bursarConfig.id ? `${bursarConfigApi}/${bursarConfig.id}` : bursarConfigApi;

      return ky[kyMethod](kyPath, { json });
    },
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(key);

      if (options.onSuccess) options.onSuccess();
    },
  });

  return {
    mutateBursarConfig: mutateAsync,
  };
};

export const usePatronGroupsQuery = () => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery({
    queryKey: 'bursarPatronGroups',
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: LIMIT_MAX,
        },
      };
      const { usergroups = [] } = await ky.get('groups', kyOptions).json();

      return usergroups;
    },
  });

  return {
    isLoading,
    patronGroups: data,
  };
};

export const useBursarExportSceduler = (options = {}) => {
  const ky = useOkapiKy();

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return ky.post(bursarConfigApi);
    },
    ...options,
  });

  return {
    scheduleBursarExport: mutateAsync,
  };
};
