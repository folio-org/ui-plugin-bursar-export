import React, { useMemo } from 'react';
import { ItemAttribute } from '../../../types/TokenTypes';
import UserItemInfoToken from './UserItemInfoToken';
import { useIntl } from 'react-intl';

export default function ItemInfoToken({ prefix }: { prefix: string }) {
  const intl = useIntl();
  const attributeOptions = [
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.name',
      value: 'NAME',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.barcode',
      value: 'BARCODE',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.material',
      value: 'MATERIAL_TYPE',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.instId',
      value: 'INSTITUTION_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.campId',
      value: 'CAMPUS_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.libId',
      value: 'LIBRARY_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.locId',
      value: 'LOCATION_ID',
    },
  ];
  const options = useMemo(
    () =>
      attributeOptions
        .map((option) => ({
          label: intl.formatMessage({ id: option.labelId }),
          value: option.value as ItemAttribute,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [intl]
  );

  return (
    <UserItemInfoToken<ItemAttribute>
      prefix={prefix}
      defaultValue="NAME"
      attributeName="itemAttribute"
      options={options}
    />
  );
}
