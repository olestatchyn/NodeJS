import { SUPPORTED_COUNTRIES } from './config';
import { validateInput, validateCountry, validateYear, shortenPublicHoliday } from './helpers';

const NOT_SUPPORTED_COUNTRY = 'US';
const SUPPORTED_YEAR = new Date().getFullYear();
const NOT_SUPPORTED_YEAR = 2022;

const publicHolidayExample = {
  date: '2023',
  localName: 'EasterYO',
  name: 'Easter',
  countryCode: '1234',
  fixed: true,
  global: true,
  counties: null,
  launchYear: null,
  types: ['Something has to be here']
};

describe('Testing helpers.ts module unit tests', () => {
  describe('validateCountry test', () => {
    it('should reject passed country', () => {
      const validateCountryResponse = validateCountry(NOT_SUPPORTED_COUNTRY);
      expect(validateCountryResponse).toEqual(false);
    });

    it('should confirm passed country', () => {
      const validateCountryResponse = validateCountry(SUPPORTED_COUNTRIES[0]);
      expect(validateCountryResponse).toEqual(true);
    });
  });

  describe('validateYear test', () => {
    it('should reject passed year', () => {
      const validateYearResponse = validateYear(NOT_SUPPORTED_YEAR);
      expect(validateYearResponse).toEqual(false);
    });

    it('should confirm passed year', () => {
      const validateYearResponse = validateYear(SUPPORTED_YEAR);
      expect(validateYearResponse).toEqual(true);
    });
  });

  describe('validateInput test', () => {
    it('should throw an error as the country is not supported', () => {
      const expectedError = `Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`;
      expect(() => validateInput({ year: NOT_SUPPORTED_YEAR, country: NOT_SUPPORTED_COUNTRY })).toThrow(expectedError);
    });
  
    it('should throw an error as the year is not current', () => {
      const expectedError = `Year provided not the current, received: ${NOT_SUPPORTED_YEAR}`;
      expect(() => validateInput({ year: NOT_SUPPORTED_YEAR, country: SUPPORTED_COUNTRIES[0] })).toThrow(expectedError);
    });
  
    it('should confirm passed arguments', () => {
      const result = validateInput({ year: SUPPORTED_YEAR, country: SUPPORTED_COUNTRIES[0] });
      expect(result).toEqual(true);
    });
  });

  describe('shortenPublicHoliday test', () => {
    it('should return the expexted result', () => {
      const result = shortenPublicHoliday(publicHolidayExample);
      const expectedResult = {
        name: 'Easter',
        localName: 'EasterYO',
        date: '2023'
      };
      expect(result).toEqual(expectedResult);
    });
  });
});
