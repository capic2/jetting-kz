import { iddleJetValues, jetValues, WeatherInfo } from '@jetting-kz/common';
import {
  CarbSetup,
  Engine,
  Fuel,
  Settings,
  Track,
} from '../types.ts';
import {
  computeAirDensity,
  getEngineCoefficient,
  getFloatCoefficient,
  getFuelCoefficient,
  getNearestElement,
} from './common.ts';

export const computeMainJetValues = ({
  weatherInfo,
  floats,
  oilMixPercent,
  floatHeight,
  fineTuningMainJetValue,
  engine,
  fuel,
  mainJetA,
  mainJetB,
  unknown3,
}: {
  weatherInfo: WeatherInfo;
  floats: Settings['floats'];
  oilMixPercent: Settings['oilMixPercent'];
  floatHeight: Settings['floatHeight'];
  fineTuningMainJetValue: number;
  engine: Engine;
  fuel: Fuel;
  mainJetA: CarbSetup['mainJetA'];
  mainJetB: CarbSetup['mainJetB'];
  unknown3?: number;
}) => {
  const airDensity = computeAirDensity(
    weatherInfo.pressure,
    weatherInfo.humidity,
    weatherInfo.temperature
  );
  const oilMixPercentCorrection = 0.0104 * oilMixPercent + 0.9481;
  const floatHeightCorrection = 0.003 * floatHeight + 0.9798;
  const floatCoefficient = -0.0238 * getFloatCoefficient(floats) + 1.1016;
  const m4233a = getFuelCoefficient(fuel) / 1.5 + 1.0;
  const d11 = -fineTuningMainJetValue / 100.0 + 1.0;
  let mainJetCorrectionFactor =
    d11 *
    airDensity *
    oilMixPercentCorrection *
    floatHeightCorrection *
    floatCoefficient *
    m4233a;
  const engineCoefficient = getEngineCoefficient(engine);
  mainJetCorrectionFactor *= engineCoefficient;
  const d162 = mainJetCorrectionFactor * 1.008;
  const mainJetRealValue = d162 * mainJetA + mainJetB;

  return {
    mainJetRealValue: Number(mainJetRealValue.toFixed(2)),
    mainJetValue: getNearestElement(mainJetRealValue, jetValues),
  };
};

export const computeIddleJetValues = ({
  weatherInfo,
  oilMixPercent,
  engine,
  fuel,
  track,
  iddleJetA,
  iddleJetB,
  unknown3,
}: {
  weatherInfo: WeatherInfo;
  oilMixPercent: Settings['oilMixPercent'];
  engine: Engine;
  fuel: Fuel;
  track: Track;
  iddleJetA: CarbSetup['iddleJetA'];
  iddleJetB: CarbSetup['iddleJetB'];
  unknown3: CarbSetup['unknown3'];
}) => {
  const airDensity = computeAirDensity(
    weatherInfo.pressure,
    weatherInfo.humidity,
    weatherInfo.temperature
  );
  const oilMixPercentCorrection = 0.0104 * oilMixPercent + 0.9481;
  const d15 = airDensity * 1.0 * oilMixPercentCorrection;
  let m4562i3 = (getFuelCoefficient(fuel) / 2.0 + 1.0) * d15;

  if (engine === 'K9C' || engine === 'K9B') {
    m4562i3 *= 0.9975000023841858;
  }
  m4562i3 *= getEngineCoefficient(engine);

  let d18 = m4562i3 * 1.008;

  if (track === 'SPRINT_LONG_STRAIGHT') {
    d18 *= 0.9850000143051147;
  } else if (track === 'SPRINT_SHORT_STRAIGHT') {
    d18 *= 1.0299999713897705;
  }

  let iddleJetRealValue = d18 * iddleJetA + iddleJetB;

  if (unknown3 && unknown3 !== 0 && iddleJetRealValue < unknown3) {
    iddleJetRealValue = unknown3;
  }

  return {
    iddleJetRealValue: Number(iddleJetRealValue.toFixed(2)),
    iddleJetValue: getNearestElement(iddleJetRealValue, iddleJetValues),
  };
};
