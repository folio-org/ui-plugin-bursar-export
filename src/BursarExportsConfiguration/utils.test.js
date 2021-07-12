import {
  padString,
  diffTransferTypes,
} from './utils';

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

  describe('diffTransferTypes', () => {
    it('should return right difference', () => {
      expect(
        diffTransferTypes(
          [{ feefineTypeId: 'uid1' }, { feefineTypeId: 'uid3' }],
          [{ feefineTypeId: 'uid1' }, { feefineTypeId: 'uid2' }],
        ),
      ).toEqual([{ feefineTypeId: 'uid3' }]);
    });

    it('should not throw errors when arguments are not defined', () => {
      expect(diffTransferTypes()).toEqual([]);
    });
  });
});
