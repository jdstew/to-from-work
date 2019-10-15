import { ContextProperties } from './nws-obs-context-properties';

export interface ObservationContext {
    0: string;
    wx: string;
    s: string;
    geo: string;
    unit: string;
    vocab: string;
    geometry: ContextProperties;
    city: ContextProperties;
    state: ContextProperties;
    distance: ContextProperties;
    bearing: ContextProperties;
    value: ContextProperties;
    unitCode: ContextProperties;
    forecastOffice: ContextProperties;
    forecastGridData: ContextProperties;
    publicZone: ContextProperties;
    county: ContextProperties;
}