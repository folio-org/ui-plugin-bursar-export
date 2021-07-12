import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  Selection,
} from '@folio/stripes/components';
import {
  filterSelectValues,
} from '@folio/stripes-acq-components';

import { useFeeFineOwnersQuery } from '../FeeFineOwnerField';

export const BursarItemsFilter = ({ onChange }) => {
  const [owner, setOwner] = useState();

  const { owners } = useFeeFineOwnersQuery();

  const dataOptions = owners.map(({ id, owner: ownerName }) => ({
    value: id,
    label: ownerName,
  }));

  const changeOwner = (selecteOwner) => {
    setOwner(selecteOwner);
    onChange({ owner: selecteOwner });
  };

  useEffect(() => {
    if (owners?.length) {
      changeOwner(owners[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owners]);

  return (
    <Row>
      <Col xs={3}>
        <Selection
          dataOptions={dataOptions}
          onChange={changeOwner}
          onFilter={filterSelectValues}
          value={owner}
          label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.owner" />}
        />
      </Col>
    </Row>
  );
};

BursarItemsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
