
import {
  computeAirDensity,
  getEngineCoefficient,
  getFloatCoefficient,
  getFuelCoefficient, getNearestElement
} from './common.ts';
import { CarbSetup, Engine, Fuel, Settings, Track } from '../types.ts';
import { EmulsionTube, emulsionTubeValues, WeatherInfo } from '@jetting-kz/common';


export const computeEmulsionTubeValues = ({
  weatherInfo,
  emulsionTubeA,
  emulsionTubeB,
  engineType,
  oilMixPercent,
  floatHeight,
  floats,
  fuelType,
  trackType,
}: {
  weatherInfo: WeatherInfo;
  oilMixPercent: Settings['oilMixPercent'];
  floatHeight: Settings['floatHeight'];
  floats: Settings['floats'];
  fuelType: Fuel;
  engineType: Engine;
  emulsionTubeA: CarbSetup['emulsionTubeA'];
  emulsionTubeB: CarbSetup['emulsionTubeB'];
  trackType: Track;
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

  if (engineType === 'K9C' || engineType === 'K9B') {
    m4562i2 *= 0.9975000023841858;
  }

  m4562i2 *= getEngineCoefficient(engineType);

  let d17 = m4562i2 * 1.008;

  if (trackType === 'SPRINT_LONG_STRAIGHT') {
    d17 *= 0.990000143051147;
  } else if (trackType === 'SPRINT_SHORT_STRAIGHT') {
    d17 *= 1.0149999856948853;
  }
  const emulsionTubeRealValue = emulsionTubeA * d17 + emulsionTubeB;
  return {
    emulsionTubeRealValue,
    emulsionTubeValue: getNearestElement(emulsionTubeRealValue, emulsionTubeValues),
    emulsionTube: 'DP' as EmulsionTube,
  };
};
