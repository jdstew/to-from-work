import { GoogleLeg } from './google-directions-leg';

export interface GoogleRoute {
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  copyrights: string;
  legs: GoogleLeg[];
  overview_polyline: {
    points: string
  };
  summary: string;
  warnings: string[];
  waypoint_order: string[];
};
