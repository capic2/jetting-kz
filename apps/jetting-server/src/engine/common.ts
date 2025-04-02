import { airScrewPositions, Engine, Float, Fuel, Track } from '../types.ts';


export const computeAirDensity = (
  pressureInHPa: number,
  humidity: number,
  temperatureInCelsius: number
) => {
  const pressureInPa = pressureInHPa * 100; //d
  const temperatureKelvin = 273.15 + temperatureInCelsius; //d2

  // Calcul du rapport de pression de vapeur d'eau
  const vaporPressureRatio =
    ((humidity / 100) *
      (1.00062 +
        3.14e-8 * pressureInPa +
        5.6e-7 * Math.pow(temperatureInCelsius, 2)) *
      Math.exp(
        1.2378847e-5 * Math.pow(temperatureKelvin, 2) -
          0.019121316 * temperatureKelvin +
          33.93711047 -
          6343.1645 / temperatureKelvin
      )) /
    pressureInPa;

  // Calcul de la densité d'air corrigée
  return (
    ((pressureInPa * 0.0289635) /
      ((1.0 -
        ((temperatureInCelsius * -2.376e-6 + 1.9898e-4) *
          Math.pow(vaporPressureRatio, 2) +
          (1.58123e-6 -
            2.9331e-8 * temperatureInCelsius +
            1.1043e-10 * Math.pow(temperatureInCelsius, 2)) +
          (5.707e-6 - 2.051e-8 * temperatureInCelsius) * vaporPressureRatio) *
          (pressureInPa / temperatureKelvin) +
        (Math.pow(pressureInPa, 2) / Math.pow(temperatureKelvin, 2)) *
          (1.83e-11 - 7.65e-9 * Math.pow(vaporPressureRatio, 2))) *
        8.31451 *
        temperatureKelvin)) *
    (1.0 - vaporPressureRatio * 0.3779964437999551)
  );
};

export const getFloatCoefficient = (floatType: Float) => {
  switch (floatType) {
    case 'FLOAT1X40GR':
      return 2.0;
    case 'FLOAT2X28GR':
      return 2.8;
    case 'FLOAT2X35GR':
      return 3.5;
    case 'FLOAT2X36GR':
      return 3.6;
    case 'FLOAT2X45GR':
    case 'FLOAT1X9GR':
      return 4.5;
    default:
      return floatType === 'FLOAT2X4GR' || floatType !== 'FLOAT2X52GR'
        ? 4.0
        : 5.2;
  }
};

export const getFuelCoefficient = (fuelType: Fuel) => {
  if (
    fuelType === 'AKI_91' ||
    fuelType === 'RON_95' ||
    fuelType === 'AKI_93' ||
    fuelType === 'VP_RACING_MS93' ||
    fuelType === 'RON_98'
  ) {
    return -0.01;
  }

  if (fuelType === 'VP_C12') {
    return -0.045;
  }

  if (fuelType === 'VP_110') {
    return 0.035;
  }

  if (fuelType === 'AKI_91_ETHANOL' || fuelType === 'AKI_93_ETHANOL') {
    return 0.055;
  }

  return fuelType === 'VP_MRX02' ? 0.115 : 0.0;
};

export const getEngineCoefficient = (engineType: Engine) => {
  switch (engineType) {
    case 'K9':
      return 0.9925000071525574;

    case 'K9B':
    case 'K9C':
      return 0.9975000023841858;

    case 'KZ10':
      return 1.002500057220459;

    case 'KZ10B':
      return 1.0075000524520874;
    case 'KZ_10C':
    case 'KZ_R1':
      return 1.0125000476837158;
  }
};

export const getTrackCoefficient = (trackType: Track) => {
  switch (trackType) {
    case 'SPRINT_LONG_STRAIGHT':
      return { mainJet: 1.0149999856948853, emulsionTube: 0.990000143051147 };
    case 'SPRINT_SHORT_STRAIGHT':
      return { mainJet: 0.9850000143051147, emulsionTube: 1.0149999856948853 };
    default:
      return { mainJet: 1.0 /*1.002500057220459*/, emulsionTube: 1.0 };
  }
};

export const getNearestElement = <T extends number>(d7: number, iArr: readonly T[]): T => {
  let lower: T;
  let upper: T;
  let index = 0;

  while (index < iArr.length && iArr[index] < d7) {
    index++;
  }

  if (index === 0) {
    lower = iArr[0];
    upper = iArr[0];
  } else if (index === iArr.length) {
    lower = iArr[iArr.length - 1];
    upper = iArr[iArr.length - 1];
  } else {
    lower = iArr[index - 1];
    upper = iArr[index];
  }

  return (upper - d7 < d7 - lower) ? upper : lower;
};

export const getClosestAirScrewPosition = (target: number) => {
  let closest = -1;
  let minDiff = Number.MAX_VALUE;

  for (const key in airScrewPositions) {
    const value = parseFloat(key); // Convertit la clé string en number
    const diff = Math.abs(target - value);

    if (diff < minDiff) {
      minDiff = diff;
      closest = value;
    }
  }

  return closest;
};

export const adjustValue = (d7: number, i6: number) => {
  const d8 = Math.floor(d7);
  const d9 = d7 - d8;
  let rounded = d9 <= 0.25 || d9 >= 0.75 ? Math.round(d7) : d8 + 0.5;

  if (rounded > i6) {
    rounded = i6;
  }

  const minValue = 1;
  return rounded < minValue ? minValue : rounded;
};

export const clampAndRound = (value: number, min: number, max: number) => {
  let rounded = Math.round(value);

  if (rounded > max) {
    rounded = max;
  }

  if (rounded < min) {
    rounded = min;
  }

  return rounded;
};

/*export const getNeedlePosition = ({
  needleType,
  needlePositionRealValue,
  needleTypeCodeRealValue,
  semiStep,
}: {
  needleType: NeedleType;
  needlePositionRealValue: CarbSetupResult['needlePositionRealValue'];
  needleTypeCodeRealValue: CarbSetupResult['needleTypeCodeRealValue'];
  semiStep: boolean;
}) => {
  const m4565l3 = clampAndRound(
    needleTypeCodeRealValue,
    0,
    needleTypes.length - 1
  );
  const f10 = m4565l3 <= 1.0 ? 0.5 : m4565l3 > 1.0 ? -0.5 : 0.0;

  switch (needleType) {
    case 'K3':
    case 'K8':
    case 'K16':
    case 'U16':
      const i9 = 3;
      if (semiStep) {
        return clampAndRound(needlePositionRealValue - f10, 1, 3);
        // const i10 = 1
        /!*f7 = c2334d.f9029l;
        m4565l2 = C2338h.m4565l(m4565l - (f7 / 10.0f), i10, i9);
        c2333c.f9005l = m4565l2;*!/
      } else {
        return adjustValue(needlePositionRealValue - f10, 3);
      }
     case 'K28':
     case 'K98':
     case 'K27':
      const i9 = 5;
      if (semiStep) {
        return adjustValue(needlePositionRealValue, 5);
        // const i10 = 1
        /!*f7 = c2334d.f9029l;
        m4565l2 = C2338h.m4565l(m4565l - (f7 / 10.0f), i10, i9);
        c2333c.f9005l = m4565l2;*!/
      } else {
        return clampAndRound(needlePositionRealValue, 1, 5);
        /!*
        i10=1
        c2333c.f9005l = m4565l;
        f7 = c2334d.f9029l;
        m4565l2 = C2338h.m4565l(m4565l - (f7 / 10.0f), i10, i9);
        c2333c.f9005l = m4565l2;*!/

      }
  }
};*/
