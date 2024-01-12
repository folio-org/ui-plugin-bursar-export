import LengthControl from '../../types/LengthControl';
import { DateFormatType } from '../../types/TokenTypes';
import { applyDecimalFormat, applyLengthControl, formatDate } from './utils';

describe('Export preview utility functions', () => {
  describe('date formatter', () => {
    // Jan 2, 2021 @ 03:04:05
    const TEST_DATE = new Date(2021, 0, 2, 3, 4, 5);

    test.each([
      [DateFormatType.YEAR_LONG, 2021],
      [DateFormatType.YEAR_SHORT, 21],
      [DateFormatType.MONTH, 1],
      [DateFormatType.DATE, 2],
      [DateFormatType.HOUR, 3],
      [DateFormatType.MINUTE, 4],
      [DateFormatType.SECOND, 5],
      [DateFormatType.QUARTER, 1],
      [DateFormatType.WEEK_OF_YEAR_ISO, 1],
      [DateFormatType.WEEK_YEAR_ISO, 2021],

      // garbage in = garbage out, so we don't care what the output is
      ['' as DateFormatType, 1],
    ])('Format %s gives %s', (format, expected) =>
      expect(formatDate(format, TEST_DATE)).toBe(expected)
    );
  });

  describe('length control', () => {
    const TEST_VALUE = '0123456789';

    test.each([
      [undefined, '0123456789'],
      [{}, '0123456789'],
      [{ character: '.' }, '0123456789'],
      [{ length: 12, character: '' }, '0123456789'],
      [{ length: 12, character: '.', direction: 'FRONT' }, '..0123456789'],
      [{ length: 12, character: '.', direction: 'BACK' }, '0123456789..'],
      [{ length: 8, character: '.' }, '0123456789'],
      [{ length: 8, character: '.', truncate: true }, '01234567'],
      [
        { length: 8, character: '.', truncate: true, direction: 'FRONT' },
        '23456789',
      ],
    ] as [LengthControl, string][])(
      'length control %s gives %s',
      (lengthControl, expected) =>
        expect(applyLengthControl(TEST_VALUE, lengthControl)).toBe(expected)
    );
  });

  describe('decimal format', () => {
    const TEST_VALUE = 1234.5678;

    test.each([
      [true, '1234.57'],
      [false, '123457'],
    ])('decimal=%s gives %s', (decimal, expected) =>
      expect(applyDecimalFormat(TEST_VALUE, decimal)).toBe(expected)
    );
  });
});
