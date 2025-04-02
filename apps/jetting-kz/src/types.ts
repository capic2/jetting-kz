import { airScrewPositions } from '../../jetting-server/src/types';
import { Needle } from '@jetting-kz/common';



export interface CarbSetupResult {
  highAdjustment: number;
  fineTuningMainJetValue: number;
  fineTuningNeedleValue: number;
  fineTuningNeedlePosValue: number;
  fineTuningEmulsionTubeValue: number;
  fineTuningIdleEmulsifierValue: number;
  fineTuningThrottleValveValue: number;
  fineTuningAirScrewValue: number;
  airDensity: number;
  mainJetRealValue: number;
  mainJet: number;
  needlePositionRealValue: number;
  needlePosition: number;
  needleType: Needle | null;
  needleTypeCode: number;
  needleTypeCodeRealValue: number;
  iddleDiffuserRealValue: number;
  iddleDiffuser: number;
  iddleDiffuserType: string;
  iddleJetRealValue: number;
  iddleJet: number;
  emulsionTubeRealValue: number;
  emulsionTube: number;
  emulsionTubeType: string;
  unknown1: number;
  unknown2: number;
  unknown3: number;
  airScrewPosition: keyof typeof airScrewPositions;
  airScrewPositionName: (typeof airScrewPositions)[keyof typeof airScrewPositions];
  sparkle: any;
}
