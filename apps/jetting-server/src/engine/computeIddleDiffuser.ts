import {
  CarbSetup,
  Engine,
  Fuel,

  Track,
} from '../types.ts';
import {
  computeAirDensity,
  getEngineCoefficient,
  getFuelCoefficient,
  getNearestElement,
} from './common.ts';
import { IddleDiffuser, iddleDiffuserValues, WeatherInfo } from '@jetting-kz/common';

export const computeIddleDiffuser = ({
  weatherInfo,
  oilMixPercent,
  iddleDiffuserA,
  iddleDiffuserB,
  track,
  engine,
  fuel,
  iddleDiffuser,
}: {
  weatherInfo: WeatherInfo;
  oilMixPercent: number;
  iddleDiffuserA: CarbSetup['iddleDiffuserA'];
  iddleDiffuserB: CarbSetup['iddleDiffuserB'];
  track: Track;
  engine: Engine;
  fuel: Fuel;
  iddleDiffuser: IddleDiffuser;
}) => {
  const airDensity = computeAirDensity(
    weatherInfo.pressure,
    weatherInfo.humidity,
    weatherInfo.temperature
  );
  const oilMixPercentCorrection = 0.0104 * oilMixPercent + 0.9481;
  const d15 = airDensity * 1.0 * oilMixPercentCorrection;
  let m4562i3 = (getFuelCoefficient(fuel) / 2.0 + 1.0) * d15;
  const d7 = getEngineCoefficient(engine);
  m4562i3 *= d7;
  let d18 = m4562i3 * 1.008;
  if (track === 'SPRINT_LONG_STRAIGHT') {
    d18 *= 0.9850000143051147;
  } else if (track === 'SPRINT_SHORT_STRAIGHT') {
    d18 *= 1.0299999713897705;
  }

  const iddleDiffuserRealValue = iddleDiffuserA * d18 + iddleDiffuserB;
  return {
    iddleDiffuserRealValue: Number(iddleDiffuserRealValue.toFixed(2)),
    iddleDiffuserValue: getNearestElement(
      iddleDiffuserRealValue,
      iddleDiffuserValues
    ),
    iddleDiffuser,
  };
};
