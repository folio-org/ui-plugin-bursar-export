import React, {
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { find } from 'lodash';

import {
  FieldMultiSelectionFinal,
} from '@folio/stripes-acq-components';

import { validateRequired } from './validation';

const itemToString = item => item;

export const PatronGroupsField = ({ patronGroups = [] }) => {
  const { formatMessage } = useIntl();

  const getOptionLabel = useCallback(({ option }) => {
    return find(patronGroups, { id: option })?.group || '-';
  }, [patronGroups]);

  const dataOptions = useMemo(() => {
    return patronGroups.map(patronGroup => patronGroup.id);
  }, [patronGroups]);

  return (
    <FieldMultiSelectionFinal
      data-testid="patron-groups"
      label={formatMessage({
        id: 'ui-plugin-bursar-export.bursarExports.patronGroups',
      })}
      name="exportTypeSpecificParameters.bursarFeeFines.patronGroups"
      dataOptions={dataOptions}
      itemToString={itemToString}
      formatter={getOptionLabel}
      required
      validate={validateRequired}
    />
  );
};

PatronGroupsField.propTypes = {
  patronGroups: PropTypes.arrayOf(PropTypes.object),
};
