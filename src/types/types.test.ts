import { TYPE_ONLY as TYPE_ONLY_FV } from './FormValues';
import { TYPE_ONLY as TYPE_ONLY_LC } from './LengthControl';

// these are needed for coverage, for some reason Sonar won't consider these static files "tested" otherwise

test('Types import correctly', () => {
  expect(TYPE_ONLY_FV).toBe(true);
  expect(TYPE_ONLY_LC).toBe(true);
});
