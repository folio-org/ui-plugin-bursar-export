import { validateRequired } from './validation';

describe('validation', () => {
  describe('validateRequired', () => {
    it('should not return error message when not empty string is passed', () => {
      expect(validateRequired('0001')).not.toBeDefined();
    });

    it('should not return error message when object with thrity values is passed', () => {
      expect(validateRequired({ monday: true })).not.toBeDefined();
    });

    it('should return error message when falsy value is passed', () => {
      expect(validateRequired('')).toBeDefined();
    });

    it('should return error message when empty object is passed', () => {
      expect(validateRequired({})).toBeDefined();
    });

    it('should return error message when all object values are falsy', () => {
      expect(validateRequired({ monday: false })).toBeDefined();
    });
  });
});
