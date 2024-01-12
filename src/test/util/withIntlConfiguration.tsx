import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';
import stripesCoreTranslations from '@folio/stripes-core/translations/stripes-core/en';
import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
// cannot make TS happy without the .json
// eslint-disable-next-line import/extensions
import localTranslations from '../../../translations/ui-plugin-bursar-export/en.json';

export const translationSets = [
  {
    prefix: 'ui-plugin-bursar-export',
    translations: localTranslations,
  },
  {
    prefix: 'stripes-components',
    translations: stripesComponentsTranslations,
  },
  {
    prefix: 'stripes-core',
    translations: stripesCoreTranslations,
  },
];

export function withIntlConfigurationAnyTimezone(
  children: ReactNode,
  locale = 'en-US',
  timeZone?: string
): React.JSX.Element {
  const allTranslations: Record<string, string> = {};

  translationSets.forEach((set) => {
    const { prefix, translations } = set;
    Object.keys(translations).forEach((key) => {
      allTranslations[`${prefix}.${key}`] = translations[key];
    });
  });

  return (
    <IntlProvider
      locale={locale}
      timeZone={timeZone}
      messages={allTranslations}
    >
      {children}
    </IntlProvider>
  );
}

export default function withIntlConfiguration(
  children: ReactNode,
  locale = 'en-US',
  timeZone = 'UTC'
): React.JSX.Element {
  return withIntlConfigurationAnyTimezone(children, locale, timeZone);
}
