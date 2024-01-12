import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import { DataToken, HeaderFooterToken } from '../../types/TokenTypes';
import createPreviewData from './createPreviewData';
import createPreviewHeaderFooter from './createPreviewHeaderFooter';
import HandleInvisible from './HandleInvisible';

export default function ExportPreviewData() {
  const isAggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const header =
    useFieldArray<HeaderFooterToken>('header', {
      subscription: { value: true },
    }).fields.value ?? [];
  const data =
    useFieldArray<DataToken>('data', {
      subscription: { value: true },
    }).fields.value ?? [];
  const dataAggregate =
    useFieldArray<DataToken>('dataAggregate', {
      subscription: { value: true },
    }).fields.value ?? [];
  const footer =
    useFieldArray<HeaderFooterToken>('footer', {
      subscription: { value: true },
    }).fields.value ?? [];

  const showInvisible = useField<boolean>('preview.invisible', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const contents = useMemo(() => {
    const dataToUse = isAggregate ? dataAggregate : data;

    const { dataPreview, totalAmount, totalCount } = createPreviewData(
      dataToUse,
      isAggregate
    );

    const headerPreview = createPreviewHeaderFooter(
      header,
      totalAmount,
      totalCount
    );
    const footerPreview = createPreviewHeaderFooter(
      footer,
      totalAmount,
      totalCount
    );

    return headerPreview + dataPreview + footerPreview;
  }, [header, data, dataAggregate, footer, isAggregate]);

  return <HandleInvisible text={contents} showInvisible={showInvisible} />;
}
