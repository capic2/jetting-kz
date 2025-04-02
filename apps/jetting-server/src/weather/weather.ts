import { parseZodResult } from '@jetting-kz/http-client.ts';
import got from 'got';
import { weatherConditionsSchema } from '../schemas/weatherSchemas.ts';

//latitude: 47.65723784639425, longitude: 6.103564997998783
export const getWeatherConditions = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ffa16b4548f5d50aff32e85fc2867d9b`;

  return parseZodResult({
    method: () => got.get(url),
    schema: weatherConditionsSchema,
  });
};
