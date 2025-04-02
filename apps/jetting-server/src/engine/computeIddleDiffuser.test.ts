import { computeIddleDiffuser } from './computeIddleDiffuser';
import { carbSetups } from '../carbSetupData';

describe('computeIddleDiffuser', () => {
  const weatherConditions = {
    pressure: 1013,
    humidity: 50,
    temperature: 20,
    altitude: 0,
  };

  const results = [
    {
      index: 0,
      iddleDiffuserRealValue: 49.07,
      iddleDiffuserValue: 49,
      iddleDiffuser: 'B',
    },
    {
      index: 1,
      iddleDiffuserRealValue: 50.07,
      iddleDiffuserValue: 50,
      iddleDiffuser: 'B',
    },
    {
      index: 2,
      iddleDiffuserRealValue: 50.07,
      iddleDiffuserValue: 50,
      iddleDiffuser: 'B',
    },
    {
      index: 3,
      iddleDiffuserRealValue: 49.07,
      iddleDiffuserValue: 49,
      iddleDiffuser: 'B',
    },
    {
      index: 4,
      iddleDiffuserRealValue: 1,
      iddleDiffuserValue: 1,
      iddleDiffuser: 'CD',
    },
    {
      index: 5,
      iddleDiffuserRealValue: 70,
      iddleDiffuserValue: 70,
      iddleDiffuser: 'B',
    },
    {
      index: 6,
      iddleDiffuserRealValue: 1,
      iddleDiffuserValue: 1,
      iddleDiffuser: 'CD',
    },
    {
      index: 7,
      iddleDiffuserRealValue: 51.25,
      iddleDiffuserValue: 51,
      iddleDiffuser: 'B',
    },
    {
      index: 8,
      iddleDiffuserRealValue: 42.07,
      iddleDiffuserValue: 42,
      iddleDiffuser: 'B',
    },
    {
      index: 9,
      iddleDiffuserRealValue: 1,
      iddleDiffuserValue: 1,
      iddleDiffuser: 'CD',
    },
    {
      index: 10,
      iddleDiffuserRealValue: 100,
      iddleDiffuserValue: 100,
      iddleDiffuser: 'B',
    },
    {
      index: 11,
      iddleDiffuserRealValue: 1,
      iddleDiffuserValue: 1,
      iddleDiffuser: 'CD',
    },
  ];

  it.each(results)(
    'returns ($iddleDiffuserRealValue, $iddleDiffuser, $iddleDiffuserType) for index $index',
    ({ index, iddleDiffuserRealValue, iddleDiffuserValue, iddleDiffuser }) => {
      const result = computeIddleDiffuser({
        weatherInfo: weatherConditions,
        oilMixPercent: 4,
        iddleDiffuserA: carbSetups[index].iddleDiffuserA,
        iddleDiffuserB: carbSetups[index].iddleDiffuserB,
        track: 'SPRINT_MEDIUM',
        engine: 'K9',
        fuel: 'RON_98',
        iddleDiffuser: carbSetups[index].iddleDiffuser,
      });

      expect(result).toEqual({
        iddleDiffuserRealValue,
        iddleDiffuserValue,
        iddleDiffuser,
      });
    }
  );
});
