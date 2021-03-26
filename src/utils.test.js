import { padString } from './utils';

describe('utils', () => {
  describe('padString', () => {
    it('should cut value when its length more that expected length', () => {
      expect(padString('long', ' ', 2)).toBe('lo');
    });

    it('should add symbols to the left when value length is less than expected', () => {
      expect(padString('short', '0', 7)).toBe('00short');
    });

    it('should add symbols to the right when value length is less than expected and left pad is disabled', () => {
      expect(padString('short', '0', 7, false)).toBe('short00');
    });
  });
});
