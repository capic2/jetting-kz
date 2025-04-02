import Fastify from 'fastify';
import { z } from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { jettingResultSchema } from '@jetting-kz/common';
import { computeEngineSettings } from './engine/computeEngineSettings';
import { getWeatherConditions } from './weather/weather';
import { getFineTuningSettings, getSettings } from './settings/settings';
import { carbSetups } from './carbSetupData';

const fastify = Fastify().withTypeProvider<ZodTypeProvider>();
// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// Route avec validation automatique
fastify.get(
  '/api/jetting',
  {
    schema: {
      querystring: z.object({
        setupNumber: z.number().min(1).max(12),
        latitude: z.number(),
        longitude: z.number(),
      }),
      response: {
        200: jettingResultSchema,
      },
    },
  },
  async (request, reply) => {
    const { latitude, longitude, setupNumber } = request.query;
    const weatherConditions = await getWeatherConditions({
      latitude,
      longitude,
    });
    const settings = getSettings();
    const fineTuningSettings = getFineTuningSettings();
    const carbSetup = carbSetups[setupNumber];

    return reply.code(200).send(
      computeEngineSettings({
        weatherInfo: {
          pressure: weatherConditions.main.pressure,
          humidity: weatherConditions.main.humidity,
          temperature: weatherConditions.main.temp,
          altitude: weatherConditions.main.pressure,
        },
        settings,
        fineTuningSettings,
        carbSetup,
      })
    );
  }
);

// Démarrer le serveur
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Serveur prêt sur ${address}`);
});
