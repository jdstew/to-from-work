import { UnsoClosestPhase }  from './unso-closest-phase.phase';
import { UnsoSunMoonPhen } from './unso-sun-moon-phen.phenomenon';

export interface UnsoSunMoonData {
    apiversion: string; // ex: "2.2.1" ...this interface would need to change if the API version changed
    city: string; // ex: "Seattle"
    closestphase: UnsoClosestPhase;
    county: string; // ex: "King"
    curphase: string; // ex: "Waxing Gibbous"
    datechanged: boolean; // ex: false
    day: number; // ex: 11
    dayofweek: string; // ex:  "Wednesday"
    error: boolean; // ex: false
    fracillum: string; // ex:  "95%"
    isdst: string; // ex:  "yes"
    lat: number; // ex: 47.63
    lon: number; // ex: -122.33
    month: number; // ex: 9
    moondata: [UnsoSunMoonPhen];
    nextmoondata: [UnsoSunMoonPhen];
    nextsundata: [UnsoSunMoonPhen];
    prevmoondata: [UnsoSunMoonPhen];
    prevsundata: [UnsoSunMoonPhen];
    state: string; // ex: "WA"
    sundata: [UnsoSunMoonPhen];
    tz: number; // ex: -8
    year: number; // ex: 2019
}