import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  isEmpty,
  isObject,
  isPlainObject,
  values,
} from 'lodash';

export function validateRequired(value) {
  if (
    !value
    || (isObject(value) && isEmpty(value))
    || (isPlainObject(value) && values(value).every(v => !v))
  ) {
    return <FormattedMessage id="stripes-acq-components.validation.required" />;
  }

  return undefined;
}
