import { ObservationProperties } from './nws-obs-properties'

export interface ObservationFeature {
    id: string;
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    }
    properties: ObservationProperties;
}