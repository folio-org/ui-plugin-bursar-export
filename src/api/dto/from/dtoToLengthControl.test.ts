import dtoToLengthControl from './dtoToLengthControl';

test.each([
  [undefined, undefined],
  [
    { character: 'a', length: 3, direction: 'FRONT', truncate: false },
    { character: 'a', length: '3', direction: 'FRONT', truncate: false },
  ],
] as const)('Length control conversion from %s to %s', (input, expected) =>
  expect(dtoToLengthControl(input)).toEqual(expected)
);
