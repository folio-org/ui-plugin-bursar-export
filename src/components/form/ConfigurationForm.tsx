import { Accordion, AccordionSet, Col, ExpandAllButton, Row } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { FormApi } from 'final-form';
import React, { FormEvent, MutableRefObject, useCallback } from 'react';
import { FormRenderProps, useField } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import FormValues from '../../types/FormValues';
import AggregateSection from './sections/AggregateSection';
import CriteriaSection from './sections/CriteriaSection';
import DataTokenSection from './sections/DataTokenSection';
import ExportPreview from './sections/ExportPreview';
import HeaderFooterSection from './sections/HeaderFooterSection';
import SchedulingSection from './sections/SchedulingSection';
import TransferInfoSection from './sections/TransferInfoSection';
import { FORM_ID } from '../../constants';

interface ConfigurationFormProps {
  formApiRef: MutableRefObject<FormApi<FormValues> | null>;
}

function ConfigurationForm({ handleSubmit, formApiRef, form }: FormRenderProps<FormValues> & ConfigurationFormProps) {
  formApiRef.current = form;

  const submitter = useCallback(
    (e: FormEvent) => {
      handleSubmit(e)?.catch(() => {
        throw new Error();
      });
    },
    [handleSubmit],
  );

  const aggregateEnabled = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <form id={FORM_ID} data-testid={FORM_ID} onSubmit={submitter}>
      <AccordionSet>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton />
          </Col>
        </Row>
        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.accordion" />}>
          <SchedulingSection />
        </Accordion>
        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.accordion" />}>
          <CriteriaSection />
        </Accordion>
        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.accordion" />}>
          <AggregateSection />
        </Accordion>
        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.header.accordion" />}>
          <HeaderFooterSection name="header" />
        </Accordion>
        <Accordion
          label={
            aggregateEnabled ? (
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.data.accordion.patron" />
            ) : (
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.data.accordion.account" />
            )
          }
        >
          <DataTokenSection />
        </Accordion>
        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.footer.accordion" />}>
          <HeaderFooterSection name="footer" />
        </Accordion>

        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.accordion" />}>
          <ExportPreview />
        </Accordion>

        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.accordion" />}>
          <TransferInfoSection />
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: false,
})(ConfigurationForm);
