import React, { useMemo } from 'react';
import UserItemInfoToken from './UserItemInfoToken';
import { useIntl } from 'react-intl';
import { UserAttribute } from '../../../types/TokenTypes';

export default function UserInfoToken({ prefix }: { prefix: string }) {
  const intl = useIntl();

  const attributeOptions = [
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.folioId',
      value: 'FOLIO_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.extId',
      value: 'EXTERNAL_SYSTEM_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.groupId',
      value: 'PATRON_GROUP_ID',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.barcode',
      value: 'BARCODE',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.username',
      value: 'USERNAME',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.firstname',
      value: 'FIRST_NAME',
    },
    {
      labelId:
        'ui-plugin-bursar-export.bursarExports.token.userInfo.middlename',
      value: 'MIDDLE_NAME',
    },
    {
      labelId: 'ui-plugin-bursar-export.bursarExports.token.userInfo.lastname',
      value: 'LAST_NAME',
    },
  ];
  const options = useMemo(
    () =>
      attributeOptions.map((option) => ({
        label: intl.formatMessage({ id: option.labelId }),
        value: option.value as UserAttribute,
      })),
    [intl]
  );

  return (
    <UserItemInfoToken<UserAttribute>
      prefix={prefix}
      defaultValue="EXTERNAL_SYSTEM_ID"
      attributeName="userAttribute"
      options={options}
    />
  );
}
