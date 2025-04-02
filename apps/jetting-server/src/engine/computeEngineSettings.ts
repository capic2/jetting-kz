import { CarbSetup, FineTuningSettings, Settings } from '../types.ts';
import { computeIddleJetValues, computeMainJetValues } from './computeJet.ts';
import { computeEmulsionTubeValues } from './computeEmulsionTube.ts';
import { computeIddleDiffuser } from './computeIddleDiffuser.ts';
import { computeNeedle } from './computeNeedle.ts';
import { computeSparkle } from './computeSparkle.ts';
import { JettingResult, WeatherInfo } from '@jetting-kz/common';

export const computeEngineSettings = ({
  carbSetup,
  settings,
  fineTuningSettings,
  weatherInfo,
}: {
  carbSetup: CarbSetup;
  settings: Settings;
  fineTuningSettings: FineTuningSettings;
  weatherInfo: WeatherInfo;
}): JettingResult => {
  const mainJet = computeMainJetValues({
    mainJetA: carbSetup.mainJetA,
    mainJetB: carbSetup.mainJetB,
    engine: settings.engine,
    oilMixPercent: settings.oilMixPercent,
    floatHeight: settings.floatHeight,
    floats: settings.floats,
    fuel: settings.fuelType,
    fineTuningMainJetValue: fineTuningSettings.fineTuningMainJetValue,
    weatherInfo,
  });
  const iddleJet = computeIddleJetValues({
    weatherInfo,
    engine: settings.engine,
    oilMixPercent: settings.oilMixPercent,
    fuel: settings.fuelType,
    iddleJetB: carbSetup.iddleJetB,
    iddleJetA: carbSetup.iddleJetA,
    unknown3: carbSetup.unknown3,
    track: settings.track,
  });
  const emulsionTube = computeEmulsionTubeValues({
    emulsionTubeA: carbSetup.emulsionTubeA,
    emulsionTubeB: carbSetup.emulsionTubeB,
    floats: settings.floats,
    fuelType: settings.fuelType,
    trackType: settings.track,
    engineType: settings.engine,
    oilMixPercent: settings.oilMixPercent,
    floatHeight: settings.floatHeight,
    weatherInfo,
  });
  const iddleDiffuser = computeIddleDiffuser({
    engine: settings.engine,
    oilMixPercent: settings.oilMixPercent,
    iddleDiffuserA: carbSetup.iddleDiffuserA,
    iddleDiffuserB: carbSetup.iddleDiffuserB,
    fuel: settings.fuelType,
    iddleDiffuser: settings.iddleDiffuser,
    track: settings.track,
    weatherInfo,
  });
  const needle = computeNeedle({
    needleSemiStep: settings.needleSemiStep,
    needleTypes: carbSetup.needleTypes,
    fineTuningNeedleValue: fineTuningSettings.fineTuningNeedleValue,
    needleTypeA: carbSetup.needleTypeA,
    floatHeight: settings.floatHeight,
    floats: settings.floats,
    fuelType: settings.fuelType,
    needleClipA: carbSetup.needleClipA,
    needleClipB: carbSetup.needleClipB,
    needleTypeB: carbSetup.needleTypeB,
    oilMixPercent: settings.oilMixPercent,
    track: settings.track,
    weatherInfo,
    engine: settings.engine,
  });
  const sparkle = computeSparkle({
    sparkleSetting: settings.sparkleSetting,
    weatherInfo,
  });

  return {
    mainJetValue: mainJet.mainJetValue,
    mainJetRealValue: mainJet.mainJetRealValue,
    iddleJetValue: iddleJet.iddleJetValue,
    iddleJetRealValue: iddleJet.iddleJetRealValue,
    emulsionTubeRealValue: emulsionTube.emulsionTubeRealValue,
    emulsionTube: emulsionTube.emulsionTube,
    emulsionTubeValue: emulsionTube.emulsionTubeValue,
    iddleDiffuserRealValue: iddleDiffuser.iddleDiffuserRealValue,
    iddleDiffuser: iddleDiffuser.iddleDiffuser,
    iddleDiffuserValue: iddleDiffuser.iddleDiffuserValue,
    needlePositionRealValue: needle.needlePositionRealValue,
    needlePosition: needle.needlePosition,
    needleTypeCode: needle.needleTypeCode,
    needleTypeCodeRealValue: needle.needleTypeCodeRealValue,
    needleType: needle.needleType,
    sparkle: sparkle,
  };
};
