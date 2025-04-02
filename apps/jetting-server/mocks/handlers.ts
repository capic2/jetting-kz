import { http } from 'msw';
import { weather } from './weather';

export const handlers = [
  http.get('https://api.openweathermap.org/data/2.5/weather', () => {
    return new Response(JSON.stringify(weather));
  }),
];
