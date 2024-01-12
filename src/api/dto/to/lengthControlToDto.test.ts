import LengthControl from '../../../types/LengthControl';
import { BursarExportTokenLengthControl } from '../types';
import lengthControlToDto from './lengthControlToDto';

describe('Length control conversion', () => {
  test.each<
    [LengthControl | undefined, BursarExportTokenLengthControl | undefined]
  >([
    [undefined, undefined],
    [
      {
        character: 'a',
        length: '12',
        direction: 'FRONT',
        truncate: true,
      },
      {
        character: 'a',
        length: 12,
        direction: 'FRONT',
        truncate: true,
      },
    ],
    [
      {
        length: '12',
        direction: 'FRONT',
        truncate: true,
      },
      {
        character: '',
        length: 12,
        direction: 'FRONT',
        truncate: true,
      },
    ],
    [
      {
        character: 'abc',
        length: '3.4',
        direction: 'BACK',
        truncate: false,
      },
      {
        character: 'a',
        length: 3,
        direction: 'BACK',
        truncate: false,
      },
    ],
  ])('lengthControlToDto(%s) = %s', (input, expected) =>
    expect(lengthControlToDto(input)).toEqual(expected)
  );
});
