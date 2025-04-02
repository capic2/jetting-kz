import { ResponsePromise } from 'ky';

import { CancelableRequest, Response } from 'got';
import { z } from 'zod';

export const parseZodResult = async <
  TDataPromise extends
    | (() => ResponsePromise)
    | (() => CancelableRequest<Response>),
  TSchema extends z.ZodType
>({
  method,
  schema,
}: {
  method: TDataPromise;
  schema: TSchema;
}): Promise<z.infer<TSchema>> => {
  const data = await method().json();
  return schema.parse(data);
};
