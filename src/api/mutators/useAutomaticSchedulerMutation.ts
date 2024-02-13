import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useIntl } from 'react-intl';
import { BursarExportJobDTO, SchedulingDTO } from '../dto/types';
import useCurrentConfig from '../queries/useCurrentConfig';

export default function useAutomaticSchedulerMutation() {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const context = useContext(CalloutContext);
  const intl = useIntl();

  const currentConfig = useCurrentConfig();

  const mutation = useMutation(
    async (parameters: { bursar: BursarExportJobDTO; scheduling: SchedulingDTO }) => {
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
      onError: async () => {
        context.sendCallout({
          type: 'error',
          message: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.scheduler.mutation.automatic.error',
          }),
        });
      },
      onSuccess: async () => {
        context.sendCallout({
          type: 'success',
          message: intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.scheduler.mutation.automatic.success',
          }),
        });
        await queryClient.invalidateQueries(['ui-plugin-bursar-export', 'current-config']);
      },
    },
  );

  return mutation.mutate;
}

