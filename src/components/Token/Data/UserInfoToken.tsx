import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import UserItemInfoToken from './UserItemInfoToken';
import { UserAttribute } from '../../../types';

export default function UserInfoToken({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const options = useMemo(() => {
    const attributeOptions = [
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.FOLIO_ID',
        value: 'FOLIO_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.EXTERNAL_SYSTEM_ID',
        value: 'EXTERNAL_SYSTEM_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.PATRON_GROUP_ID',
        value: 'PATRON_GROUP_ID',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.BARCODE',
        value: 'BARCODE',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.USERNAME',
        value: 'USERNAME',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.FIRST_NAME',
        value: 'FIRST_NAME',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.MIDDLE_NAME',
        value: 'MIDDLE_NAME',
      },
      {
        labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.LAST_NAME',
        value: 'LAST_NAME',
      },
    ];

    return attributeOptions.map((option) => ({
      label: intl.formatMessage({ id: option.labelId }),
      value: option.value as UserAttribute,
    }));
  }, [intl]);

  return (
    <UserItemInfoToken<UserAttribute>
      prefix={prefix}
      defaultValue="EXTERNAL_SYSTEM_ID"
      attributeName="userAttribute"
      options={options}
    />
  );
}
