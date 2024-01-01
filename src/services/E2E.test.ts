import request from 'supertest';
import { SUPPORTED_COUNTRIES } from '../config';

const NOT_SUPPORTED_COUNTRY = 'XX';
const SUPPORTED_YEAR = new Date().getFullYear();
const NOT_SUPPORTED_YEAR = -1;

describe('E2E https://date.nager.at/Api tests', () => {
  describe('PublicHoliday endpoint', () => {
    const baseUrl = 'https://date.nager.at/Api/v3/PublicHolidays/';

    it('should get public holidays for a country and year', async () => {
      const response = await request(baseUrl)
        .get(`${SUPPORTED_YEAR}/${SUPPORTED_COUNTRIES[3]}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      expect(response.body[0]).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
        countryCode: expect.any(String),
        fixed: expect.any(Boolean),
        global: expect.any(Boolean),
        counties: expect.arrayContaining([]) || null,
        launchYear: expect.anything(),
        types: expect.any(Array),
      })
      if (response.body[0].launchYear !== null) {
        expect(typeof response.body[0].launchYear).toBe('number');
      } else {
        expect(response.body[0].launchYear).toBeNull();
      }
    });

    it('should return code 404 for an unsupported country', async () => {
      const response = await request(baseUrl)
        .get(`${SUPPORTED_YEAR}/${NOT_SUPPORTED_COUNTRY}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
    });
    
    it('should return code 400 for an unsupported year', async () => {
      const response = await request(baseUrl)
        .get(`${NOT_SUPPORTED_YEAR}/${SUPPORTED_COUNTRIES[0]}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('LongWeekend endpoint', () => {
    const baseUrl = 'https://date.nager.at/Api/v3/LongWeekend/';

    it('should get long weekends for a given country and year', async () => {
      const response = await request(baseUrl)
        .get(`${SUPPORTED_YEAR}/${SUPPORTED_COUNTRIES[3]}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      expect(response.body[0]).toEqual({
        startDate: expect.any(String),
        endDate: expect.any(String),
        dayCount: expect.any(Number),
        needBridgeDay: expect.any(Boolean)
      })
    });

    it('should return code 404 for an unsupported country', async () => {
      const response = await request(baseUrl)
        .get(`${SUPPORTED_YEAR}/${NOT_SUPPORTED_COUNTRY}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
    });
    
    it('should return code 500 for an unsupported year', async () => {
      const response = await request(baseUrl)
        .get(`${NOT_SUPPORTED_YEAR}/${SUPPORTED_COUNTRIES[0]}`);

      expect(response.status).toBe(500);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
});