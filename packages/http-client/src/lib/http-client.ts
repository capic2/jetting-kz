import { ResponsePromise } from 'ky';
import { z } from 'zod';

export const parseZodResult = async <
  TDataPromise extends () => ResponsePromise,
  TSchema extends z.ZodType
>({
    kyMethod,
    schema,
  }: {
  kyMethod: TDataPromise;
  schema: TSchema;
}): Promise<z.infer<TSchema>> => {
  const response = await kyMethod();
  const data = await response.json();

  return schema.parse(data);
};
