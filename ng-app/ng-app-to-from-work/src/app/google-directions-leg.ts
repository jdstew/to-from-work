import { GoogleStep } from './google-directions-step';

export interface GoogleLeg {
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    duration_in_traffic: {
        text: string;
        value: number;
    };
    end_address: string;
    end_location: {
        lat: number;
        lng: number;
    };
    start_address: string;
    start_location: {
        lat: number;
        lng: number;
    };
    steps: GoogleStep[];
    traffic_speed_entry: string[];
    via_waypoint: string[];
};
