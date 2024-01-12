import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { FormApi } from 'final-form';
import React, { FormEvent, MutableRefObject, useCallback } from 'react';
import { FormRenderProps, useField } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import FormValues from '../types/FormValues';
import AggregateMenu from './sections/AggregateMenu';
import CriteriaMenu from './sections/CriteriaMenu';
import DataTokenMenu from './sections/DataTokenMenu';
import ExportPreview from './sections/ExportPreview';
import HeaderFooterMenu from './sections/HeaderFooterMenu';
import SchedulingMenu from './sections/SchedulingMenu';
import TransferInfoMenu from './sections/TransferInfoMenu';

export const FORM_ID = 'ui-plugin-bursar-export-form';

interface ConfigurationFormProps {
  formApiRef: MutableRefObject<FormApi<FormValues> | null>;
}

function ConfigurationForm({
  handleSubmit,
  formApiRef,
  form,
}: FormRenderProps<FormValues> & ConfigurationFormProps) {
  formApiRef.current = form;

  const submitter = useCallback(
    (e: FormEvent) => {
      handleSubmit(e)?.catch(() => {
        throw new Error();
      });
    },
    [handleSubmit]
  );

  const aggregateEnabled = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <form id={FORM_ID} onSubmit={submitter}>
      <AccordionSet>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton />
          </Col>
        </Row>
        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.accordion" />
          }
        >
          <SchedulingMenu />
        </Accordion>
        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.accordion" />
          }
        >
          <CriteriaMenu />
        </Accordion>
        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.accordion" />
          }
        >
          <AggregateMenu />
        </Accordion>
        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.header.accordion" />
          }
        >
          <HeaderFooterMenu name="header" />
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
          <DataTokenMenu />
        </Accordion>
        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.footer.accordion" />
          }
        >
          <HeaderFooterMenu name="footer" />
        </Accordion>

        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.accordion" />
          }
        >
          <ExportPreview />
        </Accordion>

        <Accordion
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.accordion" />
          }
        >
          <TransferInfoMenu />
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: true,
})(ConfigurationForm);
