import { z } from 'zod';

const oneOf = <T>(array: readonly T[]) =>
  z.custom<T>((value: T) => {
    return array.includes(value);
  });

export const jetValues = [
  90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 102, 105, 108, 110, 112, 115,
  118, 120, 122, 125, 128, 130, 132, 135, 138, 140, 142, 145, 148, 150, 152,
  155, 158, 160, 162, 165, 168, 170, 172, 175, 178, 180, 182, 185, 188, 190,
  192, 195, 198, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255,
  260, 265,
] as const;

export const iddleJetValues = [
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 68,
  70, 72, 75, 100,
] as const;

export const emulsionTubeValues = [
  257, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272,
  273, 274, 275, 276,
] as const;

export const emulsionTube = ['DQ', 'DP'] as const;

export const iddleDiffuserValues = [
  1, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 68,
  70, 72, 75, 100,
] as const;

export const iddleDiffusers = ['B', 'CD'] as const;

export const needles = [
  'K3',
  'K8',
  'K16',
  'K23',
  'K27',
  'K28',
  'K92',
  'K96',
  'K97',
  'K98',
  'K22',
  'K21',
  'U2',
  'U3',
  'U4',
  'U7',
  'U8',
  'U12',
  'U16',
  'K93',
] as const;

export const sparkles = [
  'NGK BR9EG',
  'NGK BR10EG',
  'NGK BR11EG',
  'NGK R7282 9',
  'NGK R7282 10',
  'NGK R7282 105',
  'NGK R7282 11',
] as const;

export const jettingResultSchema = z.object({
  mainJetValue: oneOf(jetValues),
  mainJetRealValue: z.number(),
  iddleJetValue: oneOf(iddleJetValues),
  iddleJetRealValue: z.number(),
  emulsionTubeRealValue: z.number(),
  emulsionTubeValue: oneOf(emulsionTubeValues),
  emulsionTube: z.enum(emulsionTube),
  iddleDiffuserRealValue: z.number(),
  iddleDiffuserValue: oneOf(iddleDiffuserValues),
  iddleDiffuser: z.enum(iddleDiffusers),
  needlePositionRealValue: z.number(),
  needlePosition: z.number(),
  needleTypeCode: z.number(),
  needleTypeCodeRealValue: z.number(),
  needleType: z.enum(needles),
  sparkle: z.enum(sparkles),
});

export type JetValue = (typeof jetValues)[number];
export type IddleJetValue = (typeof iddleJetValues)[number];
export type EmulsionTubeValue = (typeof emulsionTubeValues)[number];
export type EmulsionTube = (typeof emulsionTube)[number];
export type IddleDiffuserValue = (typeof iddleDiffuserValues)[number];
export type IddleDiffuser = (typeof iddleDiffusers)[number];
export type Needle = (typeof needles)[number];
export type Sparkle = (typeof sparkles)[number];
export type JettingResult = z.infer<typeof jettingResultSchema>;
