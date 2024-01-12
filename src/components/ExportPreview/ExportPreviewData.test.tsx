import { render } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import ExportPreviewData from './ExportPreviewData';
import { DataTokenType, HeaderFooterTokenType } from '../../types/TokenTypes';

jest.mock('@ngneat/falso', () => ({
  randFloat: jest.fn(() => 12.34),
  randNumber: jest.fn(() => 2),
}));

describe('Export preview data component', () => {
  it('handles undefined data gracefully', () => {
    const { container } = render(
      <Form mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
        {() => <ExportPreviewData />}
      </Form>
    );
    expect(container).toHaveTextContent('');
  });

  const SAMPLE_DATA = {
    aggregate: false,
    header: [
      { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'HEADER' },
      { type: HeaderFooterTokenType.SPACE, repeat: '1' },
    ],
    data: [
      { type: DataTokenType.ARBITRARY_TEXT, text: 'DATA' },
      { type: DataTokenType.SPACE, repeat: '1' },
    ],
    dataAggregate: [
      { type: DataTokenType.ARBITRARY_TEXT, text: 'DATA_AGGREGATE' },
      { type: DataTokenType.SPACE, repeat: '1' },
    ],
    footer: [{ type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'FOOTER' }],
    preview: { invisible: false },
  };

  it('renders from form context', () => {
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={jest.fn()}
        initialValues={SAMPLE_DATA}
      >
        {() => <ExportPreviewData />}
      </Form>
    );
    expect(container).toHaveTextContent('HEADER DATA DATA FOOTER');
  });

  it('shows whitespace when selected', () => {
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={jest.fn()}
        initialValues={{ ...SAMPLE_DATA, preview: { invisible: true } }}
      >
        {() => <ExportPreviewData />}
      </Form>
    );
    expect(container).toHaveTextContent('HEADER•DATA•DATA•FOOTER');
  });

  it('uses aggregate data when applicable', () => {
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={jest.fn()}
        initialValues={{ ...SAMPLE_DATA, aggregate: true }}
      >
        {() => <ExportPreviewData />}
      </Form>
    );
    expect(container).toHaveTextContent(
      'HEADER DATA_AGGREGATE DATA_AGGREGATE FOOTER'
    );
  });
});
