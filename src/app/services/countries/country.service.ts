import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './../../models/country';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private countriesUrl = '/api/countries';  // URL to web api

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  getCountryById(id: number): Observable<Country>{
    const url = `${this.countriesUrl}/${id}`;
    return this.http.get<Country>(url);
  }
}
