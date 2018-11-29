import { Country } from './../models/country';
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the country name
 * Takes the countries list in argument.
 * Usage:
 *   countryId | countryName:countries
 * Example:
 *   {{ 1 | country:name }}
 *   formats to: Germany
*/
@Pipe({ name: 'countryName' })
export class CountryPipe implements PipeTransform {
  transform(countryId: number, countries: Country[]): string {
    let filteredCountries: Country[];
    filteredCountries = countries.filter(country => countryId == country.id);
    return filteredCountries.length > 0 ? filteredCountries[0].name : "";
  }
}