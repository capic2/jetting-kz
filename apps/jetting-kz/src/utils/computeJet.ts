interface EngineParams {
  correctionFactor: number;
  correctionFactor2: number;
  correctionFactor3: number;
  baseJetSize: number;
  jetOffset: number;
  idleJetBase: number;
  idleJetOffset: number;
  needlePosition: number;
  clipBase: number;
  clipOffset: number;
  clipSteps: number[];
  pilotJetBase: number;
  pilotJetOffset: number;
  powerJetBase: number;
  powerJetOffset: number;
  pipeType: string
  exhaustLengthBase: number;
  exhaustLengthOffset: number;
}

type TrackType = 'power' | 'idle' | 'pilot';

interface TrackConditions {
  temperatureFactor: number;
  humidityFactor: number;
  altitudeFactor: number;
  trackType: TrackType;
}

const computeJet = () => {

};

export { computeJet };
