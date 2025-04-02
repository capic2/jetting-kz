import { CarbSetup, Engine, Fuel, Settings, Track } from '../types.ts';
import {
  adjustValue,
  clampAndRound,
  computeAirDensity,
  getEngineCoefficient,
  getFloatCoefficient,
  getFuelCoefficient,
} from './common.ts';
import { WeatherInfo } from '@jetting-kz/common';

export const computeNeedle = ({
  weatherInfo,
  floats,
  oilMixPercent,
  floatHeight,
  fineTuningNeedleValue,
  engine,
  fuelType,
  needleClipA,
  needleClipB,
  track,
  needleTypeA,
  needleTypeB,
  needleTypes,
  needleSemiStep,
}: {
  weatherInfo: WeatherInfo;
  floats: Settings['floats'];
  oilMixPercent: Settings['oilMixPercent'];
  floatHeight: Settings['floatHeight'];
  fineTuningNeedleValue: number;
  engine: Engine;
  fuelType: Fuel;
  needleClipA: CarbSetup['needleClipA'];
  needleClipB: CarbSetup['needleClipB'];
  track: Track;
  needleTypeA: CarbSetup['needleTypeA'];
  needleTypeB: CarbSetup['needleTypeB'];
  needleTypes: CarbSetup['needleTypes'];
  needleSemiStep: boolean;
}) => {
  const airDensity = computeAirDensity(
    weatherInfo.pressure,
    weatherInfo.humidity,
    weatherInfo.temperature
  );
  const oilMixPercentCorrection = 0.0104 * oilMixPercent + 0.9481;
  const floatHeightCorrection = 0.003 * floatHeight + 0.9798;

  const m454a = -0.0238 * getFloatCoefficient(floats) + 1.1016;
  const d15 = airDensity * 1.0 * oilMixPercentCorrection;
  let m4562i2 =
    floatHeightCorrection *
    d15 *
    m454a *
    (getFuelCoefficient(fuelType) / 2.0 + 1.0);

  if (engine === 'K9C' || engine === 'K9B') {
    m4562i2 *= 0.9975000023841858;
  }

  m4562i2 *= getEngineCoefficient(engine);

  let d172 = m4562i2 * 1.008;
  if (track === 'SPRINT_LONG_STRAIGHT') {
    d172 *= 0.990000143051147;
  } else if (track === 'SPRINT_SHORT_STRAIGHT') {
    d172 *= 1.0149999856948853;
  }

  const needlePositionRealValue = d172 * needleClipA + needleClipB;
  const needleTypeCodeRealValue = needleTypeA * d172 + needleTypeB;

  const needleTypeCode = clampAndRound(
    needleTypeCodeRealValue,
    0,
    needleTypes.length - 1
  );
  const needleType = needleTypes[needleTypeCode];

  const f10 = needleTypeCode >= 1.0 ? 0 : -0.5;

  let needlePosition: number;
  switch (needleType) {
    // case 'K3':????
    case 'K8':
    case 'K16':
    case 'U16':
      if (needleSemiStep) {
        const needlePositionRealValueTemp = clampAndRound(
          needlePositionRealValue - f10,
          1,
          3
        );
        needlePosition = clampAndRound(
          needlePositionRealValueTemp - fineTuningNeedleValue / 10.0,
          1,
          3
        );
      } else {
        const needlePositionRealValueTemp = adjustValue(
          needlePositionRealValue - f10,
          3
        );
        needlePosition = adjustValue(
          needlePositionRealValueTemp - fineTuningNeedleValue / 10.0,
          3
        );
      }
      break;
    case 'K28':
    case 'K98':
    case 'K27':
      if (needleSemiStep) {
        const needlePositionTemp = adjustValue(
          needlePositionRealValue - f10,
          5
        );
        needlePosition = adjustValue(
          needlePositionTemp - fineTuningNeedleValue / 10.0,
          5
        );
      } else {
        const needlePositionRealValueTemp = clampAndRound(
          needlePositionRealValue,
          1,
          5
        );
        needlePosition = clampAndRound(
          needlePositionRealValueTemp - fineTuningNeedleValue / 10.0,
          1,
          5
        );
      }
      break;
    default:
      if (needleSemiStep) {
        const needlePositionRealValueTemp = adjustValue(
          needlePositionRealValue - f10,
          4
        );
        needlePosition = adjustValue(
          needlePositionRealValueTemp - fineTuningNeedleValue / 10.0,
          4
        );
      } else {
        /*const needlePositionRealValueTemp = clampAndRound(
          needlePositionRealValue,
          1,
          4
        );*/
        needlePosition = clampAndRound(
          needlePositionRealValue - fineTuningNeedleValue / 10.0,
          1,
          4
        );
      }
  }

  return {
    needlePositionRealValue: Number(needlePositionRealValue.toFixed(2)),
    needlePosition,
    needleTypeCode,
    needleTypeCodeRealValue,
    needleType,
  };
};
