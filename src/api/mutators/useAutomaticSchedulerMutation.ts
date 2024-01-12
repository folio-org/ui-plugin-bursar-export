import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { BursarExportJobDTO, SchedulingDTO } from '../dto/types';
import useCurrentConfig from '../queries/useCurrentConfig';

export default function useAutomaticSchedulerMutation() {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const context = useContext(CalloutContext);

  const currentConfig = useCurrentConfig();

  const mutation = useMutation(
    async (parameters: {
      bursar: BursarExportJobDTO;
      scheduling: SchedulingDTO;
    }) => {
      if (currentConfig.data) {
        return ky.put(`data-export-spring/configs/${currentConfig.data.id}`, {
          json: {
            ...currentConfig.data,
            exportTypeSpecificParameters: { bursarFeeFines: parameters.bursar },
            ...parameters.scheduling,
          },
        });
      } else {
        return ky.post('data-export-spring/configs', {
          json: {
            type: 'BURSAR_FEES_FINES',
            exportTypeSpecificParameters: { bursarFeeFines: parameters.bursar },
            ...parameters.scheduling,
          },
        });
      }
    },
    {
      onError: () =>
        context.sendCallout({ type: 'error', message: 'Failed to save job' }),
      onSuccess: async () => {
        context.sendCallout({
          type: 'success',
          message: 'Configuration saved',
        });
        await queryClient.invalidateQueries([
          'ui-plugin-bursar-export',
          'current-config',
        ]);
      },
    }
  );

  return async (parameters: {
    bursar: BursarExportJobDTO;
    scheduling: SchedulingDTO;
  }) => {
    try {
      await mutation.mutateAsync(parameters);
    } catch (e) {}
    return {};
  };
}
