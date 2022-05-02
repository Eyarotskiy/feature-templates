import * as utils from './utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('should return default string for incorrect date', () => {
      expect(utils.formatDate()).toBe('invalid date');
      expect(utils.formatDate(undefined)).toBe('invalid date');
    });

    it('should return formatted date', () => {
      const TEST_DATE_1 = new Date('2022-01-30T12:56:35.659Z');
      const TEST_DATE_2 = new Date('2022-01-30');

      expect(utils.formatDate(TEST_DATE_1)).toBe('30-01-2022 13:56');
      expect(utils.formatDate(TEST_DATE_2)).toBe('30-01-2022 01:00');
    });
  });
});
