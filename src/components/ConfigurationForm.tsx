import { Accordion, AccordionSet, Col, ExpandAllButton, Row } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { FormApi } from 'final-form';
import React, { FormEvent, MutableRefObject, useCallback } from 'react';
import { FormRenderProps, useField } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { FORM_ID } from '../constants';
import { FormValues } from '../types';
import {
  AggregateSection,
  CriteriaSection,
  DataTokenSection,
  ExportPreviewSection,
  HeaderFooterSection,
  SchedulingSection,
  TransferInfoSection
} from './FormSection';

interface ConfigurationFormSectionProps {
  formApiRef: MutableRefObject<FormApi<FormValues> | null>;
}

function ConfigurationFormSection({ handleSubmit, formApiRef, form }: FormRenderProps<FormValues> & ConfigurationFormSectionProps) {
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
          <ExportPreviewSection />
        </Accordion>

        <Accordion label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.accordion" />}>
          <TransferInfoSection />
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormSectionProps, FormValues>({
  validateOnBlur: false,
})(ConfigurationFormSection);
