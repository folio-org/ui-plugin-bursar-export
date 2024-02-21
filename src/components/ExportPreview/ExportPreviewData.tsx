import React, { useEffect, useState } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import { DataToken, HeaderFooterToken } from '../../types/TokenTypes';
import createPreviewData from './createPreviewData';
import createHeaderFooterString from './createHeaderFooterString';
import HandleInvisible from './HandleInvisible';

export default function ExportPreviewData() {
  const isAggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const header =
    useFieldArray<HeaderFooterToken>('header', {
      subscription: { value: true },
    }).fields.value;
  const data =
    useFieldArray<DataToken>('data', {
      subscription: { value: true },
    }).fields.value;
  const dataAggregate =
    useFieldArray<DataToken>('dataAggregate', {
      subscription: { value: true },
    }).fields.value;
  const footer =
    useFieldArray<HeaderFooterToken>('footer', {
      subscription: { value: true },
    }).fields.value;

  const showInvisible = useField<boolean>('preview.invisible', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const [contents, setContents] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dataToUse = (isAggregate ? dataAggregate : data) ?? [];
      const { dataPreview, totalAmount, totalCount } = await createPreviewData(dataToUse, isAggregate);
      const headerPreview = createHeaderFooterString(header ?? [], totalAmount, totalCount);
      const footerPreview = createHeaderFooterString(footer ?? [], totalAmount, totalCount);

      // Concatenate header, data, and footer then update state
      setContents(headerPreview + dataPreview + footerPreview);
    };

    fetchData();
  }, [header, data, dataAggregate, footer, isAggregate]);

  return <HandleInvisible text={contents} showInvisible={showInvisible} />;
}
