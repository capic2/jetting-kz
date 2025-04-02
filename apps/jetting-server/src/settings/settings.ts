import { FineTuningSettings, Settings } from '../types';

export const getSettings = (): Settings => {
  return {
    track: 'SPRINT_MEDIUM',
    engine: 'KZ_R1',
    floats: 'FLOAT2X28GR',
    floatHeight: 2,
    oilMixPercent: 4,
    fuelType: 'AKI_91',
    emulsionTube: 'DP',
    sparkleSetting: 'NGK_EG',
    needleSemiStep: false,
    iddleDiffuser: 'B',
  };
};

export const getFineTuningSettings = (): FineTuningSettings => {
  return {
    fineTuningHighValue: 2,
    fineTuningHighPercentage: 0.5,
    fineTuningMidValue: 1,
    fineTuningMidPercentage: 0.5,
    fineTuningLowValue: 0.5,
    fineTuningLowPercentage: 0.5,
    fineTuningNeedleValue: 1,
    fineTuningMainJetValue: 1,
    fineTuningNeedlePosValue: 1,
    fineTuningThrottleValveValue: 30,
    fineTuningEmulsionTubeValue: 257,
    fineTuningIdleEmulsifierValue: 259,
    fineTuningAirScrewValue: 0.0,
    fineTuningIdleCaption: 1,
  };
};
