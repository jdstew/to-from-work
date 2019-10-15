import { ObservationContext } from './nws-obs-context';
import { ObservationFeature } from './nws-obs-features';


export interface WeatherObservation {
    context: ObservationContext[];
    type: string;
    features: ObservationFeature[];
}