import { VisualObservation } from './nws-obs-visual-obs';
import { MeasuredObservation } from './nws-obs-measurement';
import { CloudObservation } from './nws-obs-cloud-layer';

export interface ObservationProperties {
    id: string;
    type: string;
    elevation: {
        value: number;
    }
    unitCode: string;
    station: string;
    timestamp: Date;
    rawMessage: string;
    textDescription: string;
    icon: string;
    presentWeather: VisualObservation[];
    temperature: MeasuredObservation;
    dewpoint: MeasuredObservation;
    windDirection: MeasuredObservation;
    windSpeed: MeasuredObservation;
    windGust: MeasuredObservation;
    barometricPressure: MeasuredObservation;
    seaLevelPressure: MeasuredObservation;
    visibility: MeasuredObservation;
    maxTemperatureLast24Hours: MeasuredObservation;
    minTemperatureLast24Hours: MeasuredObservation;
    precipitationLastHour: MeasuredObservation;
    precipitationLast3Hours: MeasuredObservation;
    precipitationLast6Hours: MeasuredObservation;
    relativeHumidity: MeasuredObservation;
    windChill: MeasuredObservation;
    heatIndex: MeasuredObservation;
    cloudLayers: CloudObservation[];
}