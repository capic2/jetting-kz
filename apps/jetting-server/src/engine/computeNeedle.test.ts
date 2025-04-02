import { carbSetups } from '../carbSetupData';
import { computeNeedle } from './computeNeedle';

describe('computeNeedle', () => {
  const weatherInfo = {
    pressure: 1013,
    humidity: 50,
    temperature: 20,
    altitude: 0,
  };

  const results = [
    {
      index: 0,
      needlePositionRealValue: 1.99,
      needlePosition: 2.0,
      needleType: 'K28',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 1,
      needlePositionRealValue: 2.49,
      needlePosition: 2.5,
      needleType: 'K98',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 2,
      needlePositionRealValue: 2.49,
      needlePosition: 2.5,
      needleType: 'K22',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 3,
      needlePositionRealValue: 2.19,
      needlePosition: 2.0,
      needleType: 'K23',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 4,
      needlePositionRealValue: 2.33,
      needlePosition: 3.0,
      needleType: 'K8',
      needleTypeCode: 0,
      needleTypeCodeRealValue: 0,
    },
    {
      index: 5,
      needlePositionRealValue: 2.83,
      needlePosition: 3.0,
      needleType: 'K3',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 6,
      needlePositionRealValue: 2.41,
      needlePosition: 2.5,
      needleType: 'K3',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 7,
      needlePositionRealValue: 2.12,
      needlePosition: 2.0,
      needleType: 'K96',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 8,
      needlePositionRealValue: 1.92,
      needlePosition: 2.0,
      needleType: 'U7',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 9,
      needlePositionRealValue: 1.92,
      needlePosition: 2.0,
      needleType: 'U2',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
    {
      index: 10,
      needlePositionRealValue: 1.91,
      needlePosition: 2.5,
      needleType: 'U12',
      needleTypeCode: 0,
      needleTypeCodeRealValue: 0,
    },
    {
      index: 11,
      needlePositionRealValue: 1.72,
      needlePosition: 1.5,
      needleType: 'U3',
      needleTypeCode: 1,
      needleTypeCodeRealValue: 1,
    },
  ];

  it.each(results)(
    'returns ($needlePositionRealValue, needlePosition, needleTypeCodeRealValue) for index $index',
    ({
      index,
      needlePositionRealValue,
      needlePosition,
      needleType,
      needleTypeCode,
      needleTypeCodeRealValue,
    }) => {
      const result = computeNeedle({
        weatherInfo,
        floats: 'FLOAT1X9GR',
        oilMixPercent: 4,
        floatHeight: 11,
        fineTuningNeedleValue: 0,
        engine: 'K9',
        fuelType: 'RON_98',
        needleClipA: carbSetups[index].needleClipA,
        needleClipB: carbSetups[index].needleClipB,
        track: 'SPRINT_MEDIUM',
        needleTypeA: carbSetups[index].needleTypeA,
        needleTypeB: carbSetups[index].needleTypeB,
        needleTypes: carbSetups[index].needleTypes,
        needleSemiStep: true
      });

      expect(result).toEqual({
        needlePositionRealValue,
        needlePosition,
        needleTypeCode,
        needleTypeCodeRealValue,
        needleType,
      });
    }
  );
});
