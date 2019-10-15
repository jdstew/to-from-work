import { GoogleWaypoint } from './google-directions-waypoint';
import { GoogleRoute } from './google-directions-route';

export interface GoogleDirections {
    geocoded_waypoints: GoogleWaypoint [];
    routes: GoogleRoute [];
    status: string;
}