import axios from 'axios';
import { SUPPORTED_COUNTRIES } from '../config';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';

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

describe('public-holidays.service.ts module unit tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getListOfPublicHolidays test', () => {
    it('should return a list of public holidays for a supported country', async () => {
      const expectedResult = [{
        name: 'Easter',
        localName: 'EasterYO',
        date: '2023'
      }];
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [publicHolidayExample] }));

      const result = await getListOfPublicHolidays(SUPPORTED_YEAR, SUPPORTED_COUNTRIES[0]);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error for an unsupported country', async () => {
      const expectedError = `Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`;
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [publicHolidayExample] }));

      await expect(getListOfPublicHolidays(SUPPORTED_YEAR, NOT_SUPPORTED_COUNTRY)).rejects.toThrow(expectedError);
    });

    it('should throw an error for an unsupported year', async () => {
      const expectedError = `Year provided not the current, received: ${NOT_SUPPORTED_YEAR}`;
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [publicHolidayExample] }));

      await expect(getListOfPublicHolidays(NOT_SUPPORTED_YEAR, SUPPORTED_COUNTRIES[0])).rejects.toThrow(expectedError);
    });

    it('4', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [] }));

      const result = getListOfPublicHolidays(SUPPORTED_YEAR, SUPPORTED_COUNTRIES[0]);

      await expect(result).resolves.toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday test', () => {
    it('should return false', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: 404 }));
      const result = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]);

      expect(result).toEqual(false);
    });
  });

  describe('getNextPublicHolidays test', () => {
    it('should return a list of next public holidays for a supported country', async () => {
      const expectedResult = [{
        name: 'Easter',
        localName: 'EasterYO',
        date: '2023'
      }];
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [publicHolidayExample] }));

      const result = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error for an unsupported country', async () => {
      const expectedError = `Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`;
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [publicHolidayExample] }));

      await expect(getNextPublicHolidays(NOT_SUPPORTED_COUNTRY)).rejects.toThrow(expectedError);
    });
  });
});

describe('public-holidays.service.ts module integration tests', () => {
  describe('getListOfPublicHolidays test', () => {
    it('should return data from external request', async () => {
      const result = await getListOfPublicHolidays(SUPPORTED_YEAR, SUPPORTED_COUNTRIES[0]);

      expect(result).not.toEqual([]);
    });

    it('should reject data provided due to not current year', async () => {
      const expectedError = `Year provided not the current, received: ${NOT_SUPPORTED_YEAR}`;

      await expect(async () => {
        await getListOfPublicHolidays(NOT_SUPPORTED_YEAR, SUPPORTED_COUNTRIES[0]);
      }).rejects.toThrowError(expectedError);
    });

    it('should reject data provided due to unsupported country ', async () => {
      const expectedError = `Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`;

      await expect(async () => {
        await getListOfPublicHolidays(SUPPORTED_YEAR, NOT_SUPPORTED_COUNTRY);
      }).rejects.toThrowError(expectedError);
    });
  });

  describe('checkIfTodayIsPublicHoliday test', () => {
    it('should return either true or false', async () => {
      const result = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]);

      expect(result).not.toEqual(true || false);
    });
  });

  describe('getNextPublicHolidays test', () => {
    it('should return data from external request', async () => {
      const result = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

      expect(result).not.toEqual([]);
    });

    it('should reject data provided due to unsupported country ', async () => {
      const expectedError = `Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`;

      await expect(async () => {
        await getNextPublicHolidays(NOT_SUPPORTED_COUNTRY);
      }).rejects.toThrowError(expectedError);
    });
  });
});