import { parseZodResult } from '@jetting-kz/http-client';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { weatherSchema } from '../zod/schemas/weather';
import ky from 'ky';
import { createFileRoute } from '@tanstack/react-router';

const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=47.65723784639425&lon=6.103564997998783&units=metric&appid=ffa16b4548f5d50aff32e85fc2867d9b';

const weatherQueryOptions = () =>
  queryOptions({
    queryKey: ['weatherQuery'],
    queryFn: () =>
      parseZodResult({ method: () => ky.get(url), schema: weatherSchema }),
  });

export const Route = createFileRoute('/')({
  component: IndexComponent,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(weatherQueryOptions()),
});

export function IndexComponent() {
  const { data: weatherData } = useSuspenseQuery(weatherQueryOptions());

  return <></>;
}
