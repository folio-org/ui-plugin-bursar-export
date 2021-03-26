import {
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import {
  ITEM_DESCRIPTION_LENGTH,
  ITEM_DESCRIPTION_SYMBOL,
  ITEM_TYPE_LENGTH,
  ITEM_TYPE_SYMBOL,
} from './constants';
import { SCHEDULE_PERIODS } from './BursarExportsConfiguration';
import { padString } from './utils';

const bursarConfigApi = 'data-export-spring/configs';
const bursarConfigKey = ['ui-plugin-bursar-export', 'bursarConfig'];
const bursarType = 'BURSAR_FEES_FINES';

export const useBursarConfigQuery = (key = bursarConfigKey) => {
  const ky = useOkapiKy();

  const { isFetching, data = {} } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: 1,
          query: `type==${bursarType}`,
        },
      };
      const { configs = [] } = await ky.get(bursarConfigApi, kyOptions).json();

      return configs[0] || {
        type: bursarType,
        schedulePeriod: SCHEDULE_PERIODS.none,
      };
    },
  });

  return {
    isLoading: isFetching,
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
      const { exportTypeSpecificParameters: { bursarFeeFines }, weekDays = {} } = bursarConfig;

      const json = {
        ...bursarConfig,
        exportTypeSpecificParameters: {
          bursarFeeFines: {
            ...bursarFeeFines,
            typeMappings: (bursarFeeFines.typeMappings || []).map((typeMap) => ({
              ...typeMap,
              itemType: padString(typeMap.itemType, ITEM_TYPE_SYMBOL, ITEM_TYPE_LENGTH),
              itemDescription: padString(
                typeMap.itemDescription, ITEM_DESCRIPTION_SYMBOL, ITEM_DESCRIPTION_LENGTH, false,
              ),
            })),
          },
        },
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

export const useBursarExportScheduler = (options = {}) => {
  const ky = useOkapiKy();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (exportTypeSpecificParameters) => {
      const json = {
        type: bursarType,
        exportTypeSpecificParameters,
      };

      return ky.post('data-export-spring/jobs', { json });
    },
    ...options,
  });

  return {
    isLoading,
    scheduleBursarExport: mutateAsync,
  };
};
