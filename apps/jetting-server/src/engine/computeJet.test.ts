import { carbSetups } from '../carbSetupData';
import { computeIddleJetValues, computeMainJetValues } from './computeJet';

describe('computeJet', () => {
  const weatherInfo = {
    pressure: 1013,
    humidity: 50,
    temperature: 20,
    altitude: 0,
  };

  describe('computeMainJetValues', () => {
    const results = [
      { index: 0, mainJetResult: 170, mainJetRealValueResult: 169.35 },
      { index: 1, mainJetResult: 172, mainJetRealValueResult: 171.71 },
      { index: 2, mainJetResult: 172, mainJetRealValueResult: 171.09 },
      { index: 3, mainJetResult: 168, mainJetRealValueResult: 168.83 },
      { index: 4, mainJetResult: 142, mainJetRealValueResult: 142.67 },
      { index: 5, mainJetResult: 140, mainJetRealValueResult: 139.6 },
      { index: 6, mainJetResult: 142, mainJetRealValueResult: 142.84 },
      { index: 7, mainJetResult: 165, mainJetRealValueResult: 164.6 },
      { index: 8, mainJetResult: 142, mainJetRealValueResult: 142.48 },
      { index: 9, mainJetResult: 145, mainJetRealValueResult: 143.87 },
      { index: 10, mainJetResult: 140, mainJetRealValueResult: 139.54 },
      { index: 11, mainJetResult: 140, mainJetRealValueResult: 140.17 },
    ];

    it.each(results)(
      'returns ($mainJetRealValueResult, $mainJetResult) for index $index',
      ({ index, mainJetResult, mainJetRealValueResult }) => {
        const result = computeMainJetValues({
          weatherInfo,
          floats: 'FLOAT1X9GR',
          oilMixPercent: 4,
          floatHeight: 11,
          fineTuningMainJetValue: 0,
          engine: 'K9',
          fuel: 'RON_98',
          mainJetA: carbSetups[index].mainJetA,
          mainJetB: carbSetups[index].mainJetB,
        });

        expect(result).toEqual({
          mainJet: mainJetResult,
          mainJetRealValue: mainJetRealValueResult,
        });
      }
    );
  });

  describe('computeIddleJetValues', () => {
    const results = [
      { index: 0, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 1, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 2, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 3, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 4, iddleJet: 61, iddleJetRealValue: 61.07 },
      { index: 5, iddleJet: 61, iddleJetRealValue: 61.07 },
      { index: 6, iddleJet: 61, iddleJetRealValue: 61.48 },
      { index: 7, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 8, iddleJet: 60, iddleJetRealValue: 60 },
      { index: 9, iddleJet: 60, iddleJetRealValue: 60.48 },
      { index: 10, iddleJet: 68, iddleJetRealValue: 68.94 },
      { index: 11, iddleJet: 61, iddleJetRealValue: 61.48 },
    ];

    it.each(results)(
      'returns ($iddleJetRealValue, $iddleJet) for index $index',
      ({ index, iddleJetRealValue, iddleJet }) => {
        const result = computeIddleJetValues({
          weatherInfo,
          oilMixPercent: 4,
          engine: 'K9',
          fuel: 'RON_98',
          iddleJetA: carbSetups[index].iddleJetA,
          iddleJetB: carbSetups[index].iddleJetB,
          track: 'SPRINT_MEDIUM',
          unknown3: carbSetups[index].unknown3,
        });

        expect(result).toEqual({
          iddleJet,
          iddleJetRealValue,
        });
      }
    );
  });
});
