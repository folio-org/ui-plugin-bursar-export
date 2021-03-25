import { padLeft } from './utils';

describe('utils', () => {
  describe('padLeft', () => {
    it('should cut value when its length more that expected length', () => {
      expect(padLeft('long', ' ', 2)).toBe('lo');
    });

    it('should add symbols to the left when value length is less than expected', () => {
      expect(padLeft('short', '0', 7)).toBe('00short');
    });
  });
});
