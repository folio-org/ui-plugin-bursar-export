/* eslint-disable import/no-extraneous-dependencies */
declare module '*.css';

// see STTYPES-9 to understand why this is necessary
declare module '@folio/jest-config-stripes/testing-library/react' {
  export { default } from '@testing-library/react';
  export * from '@testing-library/react';
}
declare module '@folio/jest-config-stripes/testing-library/user-event' {
  export { default } from '@testing-library/user-event';
  export * from '@testing-library/user-event';
}
