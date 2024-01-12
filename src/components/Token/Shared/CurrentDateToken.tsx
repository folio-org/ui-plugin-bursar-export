import { Col } from '@folio/stripes/components';
import React from 'react';
import TimezonePicker from './TimezonePicker';
import DatePartPicker from './DatePartPicker';

export default function CurrentDateToken({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={6}>
        <DatePartPicker prefix={prefix} />
      </Col>
      <Col xs={6}>
        <TimezonePicker prefix={prefix} />
      </Col>
    </>
  );
}
