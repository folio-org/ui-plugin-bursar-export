import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { BursarExportJobDTO } from '../dto/types';

export default function useManualSchedulerMutation() {
  const ky = useOkapiKy();
  const context = useContext(CalloutContext);

  const mutation = useMutation(
    async (parameters: BursarExportJobDTO) =>
      ky.post('data-export-spring/jobs', {
        json: {
          type: 'BURSAR_FEES_FINES',
          exportTypeSpecificParameters: { bursarFeeFines: parameters },
        },
      }),
    {
      onError: () =>
        context.sendCallout({ type: 'error', message: 'Failed to start job' }),
      onSuccess: () =>
        context.sendCallout({
          type: 'success',
          message: 'Job has been scheduled',
        }),
    }
  );

  return async (parameters: BursarExportJobDTO) => {
    try {
      await mutation.mutateAsync(parameters);
    } catch (e) {}
    return {};
  };
}
