import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ItemAttribute } from '../../../types';
import UserItemInfoToken from './UserItemInfoToken';

export default function ItemInfoToken({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();
  const options = useMemo(() => {
    const attributeOptions = [
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.NAME',
        value: 'NAME',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.BARCODE',
        value: 'BARCODE',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.MATERIAL_TYPE',
        value: 'MATERIAL_TYPE',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.INSTITUTION_ID',
        value: 'INSTITUTION_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.CAMP_ID',
        value: 'CAMPUS_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.LIBRARY_ID',
        value: 'LIBRARY_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.LOCATION_ID',
        value: 'LOCATION_ID',
      },
    ];
    return attributeOptions
      .map((option) => ({
        label: intl.formatMessage({ id: option.labelId }),
        value: option.value as ItemAttribute,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [intl]);

  return (
    <UserItemInfoToken<ItemAttribute>
      prefix={prefix}
      defaultValue="NAME"
      attributeName="itemAttribute"
      options={options}
    />
  );
}
