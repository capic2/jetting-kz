import { EmulsionTube, IddleDiffuser, Needle, Sparkle } from '@jetting-kz/common';

export const sparkleSettings = ['NGK_EG', 'NGK_R7282'] as const;
export type SparkleSettings = (typeof sparkleSettings)[number];


const tracks = [
  'SPRINT_MEDIUM',
  'SPRINT_LONG_STRAIGHT',
  'SPRINT_SHORT_STRAIGHT',
] as const;
export type Track = (typeof tracks)[number];

export const engines = [
  'KZ10B',
  'KZ10',
  'K9B',
  'K9',
  'K9C',
  'KZ_10C',
  'KZ_R1',
] as const;
export type Engine = (typeof engines)[number];

export const floats = [
  'FLOAT1X40GR',
  'FLOAT2X28GR',
  'FLOAT2X35GR',
  'FLOAT2X36GR',
  'FLOAT2X4GR',
  'FLOAT2X45GR',
  'FLOAT2X52GR',
  'FLOAT1X9GR',
] as const;
export type Float = (typeof floats)[number];

export const fuels = [
  'AKI_91',
  'AKI_93',
  'RON_95',
  'RON_98',
  'VP_C12',
  'VP_110',
  'VP_MRX02',
  'AKI_91_ETHANOL',
  'AKI_93_ETHANOL',
  'VP_RACING_MS93',
] as const;
export type Fuel = (typeof fuels)[number];

export const throttleValveValue = [30, 35, 40, 45, 50, 55, 60] as const;
export type ThrottleValveValue = (typeof throttleValveValue)[number];

export const airScrewPositions: Record<number, string> = {
  0.0: '0',
  0.25: '1/4',
  0.5: '1/2',
  0.75: '3/4',
  1.0: '1',
  1.25: '1 + 1/4',
  1.5: '1 + 1/2',
  1.75: '1 + 3/4',
  2.0: '2',
  2.25: '2 + 1/4',
  2.5: '2 + 1/2',
  2.75: '2 + 3/4',
  3.0: '3',
  3.25: '3 + 1/4',
  3.5: '3 + 1/2',
  3.75: '3 + 3/4',
  4.0: '4',
  4.25: '4 + 1/4',
  4.5: '4 + 1/2',
  4.75: '4 + 3/4',
  5.0: '5',
  5.25: '5 + 1/4',
} as const;
export type AirScrewPosition = keyof typeof airScrewPositions;

export interface CarbSetup {
  // setupPref: number;
  highAdjustment: number;
  mediumAdjustment: number;
  lowAdjustment: number;
  mainJetA: number;
  mainJetB: number;
  emulsionTubeA: number;
  emulsionTubeB: number;
  // emulsionTubeRealValue: number;
  emulsionTube: EmulsionTube;
  needleTypeA: number;
  needleTypeB: number;
  needleTypes: Needle[];
  needleClipA: number;
  needleClipB: number;
  iddleDiffuserA: number;
  iddleDiffuserB: number;
  iddleDiffuser: IddleDiffuser;
  iddleJetA: number;
  iddleJetB: number;
  //airScrewValueA: number;
  //airScrewValueB: number;
  airScrewPosition: AirScrewPosition;
  throttleValveValue: ThrottleValveValue;
  unknown3?: number;
}

export interface Settings {
  track: Track;
  engine: Engine;
  floats: Float;
  floatHeight: number;
  oilMixPercent: number;
  fuelType: Fuel;
  emulsionTube: EmulsionTube;
  sparkleSetting: SparkleSettings;
  needleSemiStep: boolean;
  iddleDiffuser: IddleDiffuser;
}

export interface FineTuningSettings {
  fineTuningHighValue: number;
  fineTuningHighPercentage: number;
  fineTuningMidValue: number;
  fineTuningMidPercentage: number;
  fineTuningLowValue: number;
  fineTuningLowPercentage: number;
  fineTuningNeedleValue: number;
  fineTuningMainJetValue: number;
  fineTuningNeedlePosValue: number;
  fineTuningThrottleValveValue: number;
  fineTuningEmulsionTubeValue: number;
  fineTuningIdleEmulsifierValue: number;
  fineTuningAirScrewValue: number;
  fineTuningIdleCaption: number;
}
