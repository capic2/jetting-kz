import { z } from 'zod';

const weatherInfoSchema = z.object({
  pressure: z.number(),
  humidity: z.number(),
  temperature: z.number(),
  altitude: z.number(),
})

type WeatherInfo = z.infer<typeof weatherInfoSchema>;

export { weatherInfoSchema, WeatherInfo };
