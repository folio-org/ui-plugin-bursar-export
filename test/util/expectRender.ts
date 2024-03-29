import { render } from '@folio/jest-config-stripes/testing-library/react';
import { ReactNode } from 'react';
import withIntlConfiguration from './withIntlConfiguration';

export default function expectRender(error: ReactNode): jest.JestMatchers<string> {
  return expect(render(withIntlConfiguration(error)).container.textContent);
}
