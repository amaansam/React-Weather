// openWeather.test.js

// Mock axios before any imports (default export shape)
jest.mock('axios', () => ({
  __esModule: true,
  default: { get: jest.fn() }
}));

import axios from 'axios';
import { getCurrentWeather, getForecast } from '../openWeather';
  
  describe('openWeather API', () => {
    const apiKey=process.env.REACT_APP_OPENWEATHER_API_KEY;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    /* Verifies that function builds the correct URL and calls axios.get with it */ 
    test('getCurrentWeather calls axios with correct URL', async () => {
      axios.get.mockResolvedValueOnce({ data: { ok: true } });
  
      await getCurrentWeather('London', apiKey);
  
      expect(axios.get).toHaveBeenCalledTimes(1);
      const calledUrl = axios.get.mock.calls[0][0];
      expect(calledUrl).toContain('https://api.openweathermap.org/data/2.5/weather');
      expect(calledUrl).toContain('q=London');
      expect(calledUrl).toContain('units=metric');
      expect(calledUrl).toContain(`appid=${apiKey}`);
    });

    /* Verifies that getCurrentWeather() correctly returns response.data */
    test('getCurrentWeather returns response data', async () => {
      const payload = { name: 'Paris', main: { temp: 21 } };
      axios.get.mockResolvedValueOnce({ data: payload });
  
      const result = await getCurrentWeather('Paris', apiKey);
      expect(result).toEqual(payload);
    });
  
  
    /* Same as the first test but for the 5 day forecast instead*/
    test('getForecast calls axios with correct URL', async () => {
      axios.get.mockResolvedValueOnce({ data: { list: [] } });
  
      await getForecast('Rome', apiKey);
  
      expect(axios.get).toHaveBeenCalledTimes(1);
      const calledUrl = axios.get.mock.calls[0][0];
      expect(calledUrl).toContain('https://api.openweathermap.org/data/2.5/forecast');
      expect(calledUrl).toContain('q=Rome');
      expect(calledUrl).toContain('units=metric');
      expect(calledUrl).toContain(`appid=${apiKey}`);
    });
  
    test('getForecast returns response data', async () => {
      const payload = { city: { name: 'Berlin' }, list: [{ dt: 1 }] };
      axios.get.mockResolvedValueOnce({ data: payload });
  
      const result = await getForecast('Berlin', apiKey);
      expect(result).toEqual(payload);
    });
  
    test('getForecast propagates errors', async () => {
      const error = new Error('API down');
      axios.get.mockRejectedValueOnce(error);
  
      await expect(getForecast('Berlin', apiKey)).rejects.toThrow('API down');
    });
  });