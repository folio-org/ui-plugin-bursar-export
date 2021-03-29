import {
  convertTransferTypes,
  padString,
  shouldTransferTypesUpdate,
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

  describe('shouldTransferTypesUpdate', () => {
    it('should be thruty when transfer types length is different from initial', () => {
      expect(shouldTransferTypesUpdate([], [{ feefineTypeId: 'uid1' }])).toBeTruthy();
    });

    it('should be thruty when transfer types has new feefineTypeId', () => {
      expect(
        shouldTransferTypesUpdate([{ feefineTypeId: 'uid2' }], [{ feefineTypeId: 'uid1' }]),
      ).toBeTruthy();
    });

    it('should be thruty when transfer item type has new value', () => {
      const inititalTransferTypes = [{ feefineTypeId: 'uid1', itemType: '00003' }];
      const transferTypes = [{ feefineTypeId: 'uid1' }];

      expect(shouldTransferTypesUpdate(inititalTransferTypes, transferTypes)).toBeTruthy();
    });

    it('should be falsy when transfer types are not changed', () => {
      const inititalTransferTypes = [{ feefineTypeId: 'uid1', itemType: '00003' }];
      const transferTypes = [...inititalTransferTypes];

      expect(shouldTransferTypesUpdate(inititalTransferTypes, transferTypes)).toBeFalsy();
    });
  });

  describe('convertTransferTypes', () => {
    it('should convert transfer types to map', () => {
      const transferTypes = [{ feefineTypeId: 'uid1', itemType: '00003' }];

      expect(convertTransferTypes(transferTypes)).toEqual({
        uid1: { itemType: '00003' },
      });
    });
  });
});
