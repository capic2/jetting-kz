import { computeEmulsionTubeValues } from './computeEmulsionTube';
import { carbSetups } from '../carbSetupData';

describe('computeEmulsionTube', () => {
  const weatherInfo = {
    pressure: 1013,
    humidity: 50,
    temperature: 20,
    altitude: 0,
  };

  describe('computeEmulsionTubeValues', () => {
    const results = [
      {
        index: 0,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DQ',
      },
      {
        index: 1,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 2,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 3,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 4,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 5,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 6,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 7,
        emulsionTube: 265,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 8,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 9,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 10,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
      {
        index: 11,
        emulsionTube: 267,
        emulsionTubeRealValue: 267,
        emulsionTubeType: 'DP',
      },
    ];

    it.each(results)(
      'returns ($emulsionTubeRealValue, $emulsionTube) for index $index',
      ({index, emulsionTubeRealValue, emulsionTube, emulsionTubeType }) => {
        const result = computeEmulsionTubeValues({
          emulsionTubeA: carbSetups[7].emulsionTubeA,
          emulsionTubeB: carbSetups[7].emulsionTubeB,
          engineType: 'K9',
          weatherInfo,
          oilMixPercent: 4,
          floatHeight: 11,
          floats: 'FLOAT1X9GR',
          fuelType: 'RON_98',
          trackType: 'SPRINT_MEDIUM',
        });

        expect(result).toEqual({
          emulsionTube,
          emulsionTubeRealValue,
          emulsionTubeType
        });
      }
    );
  });
});
