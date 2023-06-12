import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private base_maps_url = 'https://maps.googleapis.com/maps/api/geocode/json';
  private api_key = environment.gmaps_key;

  constructor(private http: HttpClient) {}

  /**
   * Get the latitude and longitude of an address using the Google Maps API
   * @param address address to consult the lat. and lng.
   * @returns Observable object to keep track of the query with the lat. and lng.
   */
  getLatLongByAddrees(address: string) {
    const url: string =
      this.base_maps_url + '?address=' + address.split(' ').join('%20').split('#').join('%23') + '&key=' + this.api_key;
    return this.http.get(url);
  }

  /**
   * Get the address of a location based on the latitude and longitude using the Google Maps API
   * @param latlng Latitude and Longitude to consult the address of a location.
   * @returns Observable object to keep track of the query with the address.
   */
  getAddreesByLatLong(latlng: string) {
    const url: string =
      this.base_maps_url + '?latlng=' + latlng + '&key=' + this.api_key;
    return this.http.get(url);
  }
}
