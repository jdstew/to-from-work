export interface GoogleStep {
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    end_location: {
        lat: number;
        lng: number;
    }
    html_instructions: string;
    polyline: {
        points: string;
    };
    start_location: {
        lat: number;
        lng: number;
    };
    travel_mode: string;
}