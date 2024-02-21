import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useIntl } from 'react-intl';
import { BursarExportJobDTO } from '../dto/types';

export default function useManualSchedulerMutation() {
  const ky = useOkapiKy();
  const context = useContext(CalloutContext);
  const intl = useIntl();

  const mutation = useMutation(
    async (parameters: BursarExportJobDTO) => ky.post('data-export-spring/jobs', {
      json: {
        type: 'BURSAR_FEES_FINES',
        exportTypeSpecificParameters: { bursarFeeFines: parameters },
      },
    }),
    {
      onError: () => context.sendCallout({
        type: 'error',
        message: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.scheduler.mutation.manual.error',
        }),
      }),
      onSuccess: () => context.sendCallout({
        type: 'success',
        message: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.scheduler.mutation.manual.success',
        }),
      }),
    },
  );

  return mutation.mutate;
}
