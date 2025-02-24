import { parseZodResult } from '@jetting-kz/http-client';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { weatherSchema } from '../zod/schemas/weather';
import ky from 'ky';
import { createFileRoute } from '@tanstack/react-router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';

const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=47.65723784639425&lon=6.103564997998783&units=metric&appid=ffa16b4548f5d50aff32e85fc2867d9b';

const weatherQueryOptions = () =>
  queryOptions({
    queryKey: ['weatherQuery'],
    queryFn: () =>
      parseZodResult({ kyMethod: () => ky.get(url), schema: weatherSchema }),
  });

export const Route = createFileRoute('/')({
  component: IndexComponent,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(weatherQueryOptions()),
});

function IndexComponent() {
  const { data: weatherData } = useSuspenseQuery(weatherQueryOptions());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ temperature: number; pressure: number; humidity: number }>();
  const [response, setResponse] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="temperature">
          <Label htmlFor="temperature">Température</Label>
          <Input value={weatherData?.main.temp} {...register('temperature')} />
          <FieldError>Erreur</FieldError>
        </TextField>
        <TextField name="pressure">
          <Label htmlFor="pressure">Pression atmosphérique</Label>
          <Input value={weatherData?.main.pressure} {...register('pressure')} />
          <FieldError>Erreur</FieldError>
        </TextField>
        <TextField name="humidity">
          <Label htmlFor="humidity">Humidité</Label>
          <Input value={weatherData?.main.humidity} {...register('humidity')} />
          <FieldError>Erreur</FieldError>
        </TextField>

        <Button type="submit">Submit</Button>
      </Form>

      {response && <p>{response}</p>}
    </>
  );
}
