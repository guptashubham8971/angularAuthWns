import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventUrl = "http://localhost:3000/api/events";
  private _specialEventUrl = "http://localhost:3000/api/special";
  private _barChartUrl = "http://localhost:3000/api/barChart";
  private _geoChartUrl = "http://localhost:3000/api/geoChart";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventUrl);
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventUrl);
  }

  getBarChart() {
    return this.http.get<any>(this._barChartUrl);
  }

  getGeoChart() {
    return this.http.get<any>(this._geoChartUrl);
  }
}
