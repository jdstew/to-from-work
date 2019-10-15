import { Component, OnInit } from '@angular/core';
import { UsnoService } from './usno.service';
import { UnsoSunMoonData } from './unso-sun-moon-data.sunmoonday';
import { NwsService } from './nws.service';
import { WeatherObservation } from './nws-observation';
import { GoogleService } from './google.service'
import { GoogleDirections } from './google-directions';
import { UnsubscriptionError } from 'rxjs';
import { NullTemplateVisitor } from '@angular/compiler';
import { UnsoSunMoonPhen } from './unso-sun-moon-phen.phenomenon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  TO_FROM_HOUR: number = 12;
  pageTitle: string = 'my-app';
  usnoData: UnsoSunMoonData;
  nwsData: WeatherObservation;
  directionsData: GoogleDirections;
  errorMessage: string;

  constructor(private usnoService: UsnoService, private nwsService: NwsService, private googleService: GoogleService) {
  }

  getGeneralDirection(): string {
    let now = new Date(Date.now());
    if (now.getHours() > this.TO_FROM_HOUR) {
      return "Going home...";
    } else {
      return "Going to work...";
    }
  }

  getRouteDuration(): number { // in minutes
    if (this.directionsData !== undefined) {
      if (this.directionsData !== null) {
        if (this.directionsData.routes.length > 0) {
          let route = this.directionsData.routes[0];
          if (route.legs.length > 0) {
            let leg = route.legs[0];
            if (leg.duration_in_traffic.value > 0) {
              return Math.round(leg.duration_in_traffic.value / 60.0);
            }
          }
        }
      }
    }
    return null;
  }

  getPresentWeather(): string {
    if (this.nwsData !== undefined) {
      if (this.nwsData.features.length > 0) {
        return this.nwsData.features[0].properties.textDescription;
      }
    }
    return null;
  }

  getWindSpeed(): number {
    if (this.nwsData !== undefined) {
      if (this.nwsData.features.length > 0) {
        let windMS: number = this.nwsData.features[0].properties.windSpeed.value;
        if (!isNaN(windMS)) {
          return (windMS * 2.23694);
        }
      }
    }
    return null;
  }

  getTemperatureInF(): number {
    if (this.nwsData !== undefined) {
      if (this.nwsData.features.length > 0) {
        let temp: number = this.nwsData.features[0].properties.temperature.value;
        if (!isNaN(temp)) {
          return (temp * 9.0 / 5.0) + 32.0;
        }
      }
    }
    return null;
  }

  getApparentTemperatureInF(): number {
    if (this.nwsData !== undefined) {
      if (this.nwsData.features.length > 0) {
        let temperatureC: number = this.nwsData.features[0].properties.temperature.value;
        let relativeHumidity: number = this.nwsData.features[0].properties.relativeHumidity.value;
        let vaporPressure: number = relativeHumidity / 100.0 * 6.105 * Math.exp(17.27 * temperatureC / (237.7 + temperatureC));
        let windSpeedMS: number = this.nwsData.features[0].properties.windSpeed.value;
        let apparentTemp: number = temperatureC + 0.33 * vaporPressure - 0.70 * windSpeedMS - 4.00;
        return (apparentTemp * 9.0 / 5.0) + 32.0;
      }
    }
    return null;
  }

  getTimePresentationCutoff(): number {
    return Date.now();
  }

  getSunrise(): Date {
    if (this.usnoData !== undefined) {
      let phenomenon: UnsoSunMoonPhen[] = this.usnoData.sundata.filter(p => p.phen == 'R');
      if (phenomenon.length > 0) {
        return this.usnoService.getDateTime(this.usnoData, phenomenon[0].time);
      } else {
        return null;
      }
    }
    return null;
  }

  getSunset(): Date {
    if (this.usnoData !== undefined) {
      let phenomenon: UnsoSunMoonPhen[] = this.usnoData.sundata.filter(p => p.phen == 'S');
      if (phenomenon.length > 0) {
        return this.usnoService.getDateTime(this.usnoData, phenomenon[0].time);
      } else {
        return null;
      }
    }
    return null;
  }

  getMoonrise(): Date {
    if (this.usnoData !== undefined) {
      let phenomenon: UnsoSunMoonPhen[] = this.usnoData.moondata.filter(p => p.phen == 'R');
      if (phenomenon.length > 0) {
        return this.usnoService.getDateTime(this.usnoData, phenomenon[0].time);
      } else {
        return null;
      }
    }
    return null;
  }

  getMoonset(): Date {
    if (this.usnoData !== undefined) {
      let phenomenon: UnsoSunMoonPhen[] = this.usnoData.moondata.filter(p => p.phen == 'S');
      if (phenomenon.length > 0) {
        return this.usnoService.getDateTime(this.usnoData, phenomenon[0].time);
      } else {
        return null;
      }
    }
    return null;
  }

  getMoonFracillum(): string {  // a percentage
    if (this.usnoData !== undefined) {
      return this.usnoData.fracillum;
    }
    return null;
  }

  ngOnInit(): void {
    this.usnoService.getSunMoonData().subscribe(
      (data: UnsoSunMoonData) => this.usnoData = data
    );
    this.nwsService.getWxData().subscribe(
      (data: WeatherObservation) => this.nwsData = data
    );
    this.googleService.getDirections().subscribe(
      (data: GoogleDirections) => this.directionsData = data
    );
  }
}
