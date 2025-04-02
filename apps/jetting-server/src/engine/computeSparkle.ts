import { WeatherInfo } from '@jetting-kz/common';
import { SparkleSettings } from '../types.ts';


export const computeSparkle = ({
  weatherInfo,
  sparkleSetting
}: {
  weatherInfo: WeatherInfo;
  sparkleSetting: SparkleSettings;
}) => {
  if (sparkleSetting === 'NGK_EG') {
    if (weatherInfo.temperature < -1) {
      return "NGK BR9EG"
    } else if (weatherInfo.temperature < 15) {
      return "NGK BR10EG"
    } else {
      return "NGK BR11EG"
    }
  } else {
    if (weatherInfo.temperature < -5) {
      return "NGK R7282 9"
    } else if (weatherInfo.temperature < 5) {
      return "NGK R7282 10"
    } else if (weatherInfo.temperature < 18) {
      return "NGK R7282 105"
    } else {
      return "NGK R7282 11"
    }
  }
};
