import { Country } from '../models/country';
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the country code
 * Takes the countries list in argument.
 * Usage:
 *   countryId | countryCode:countries
 * Example:
 *   {{ 1 | countryCode:countries }}
 *   formats to: 49
*/
@Pipe({ name: 'countryCode' })
export class CountryCodePipe implements PipeTransform {
  transform(countryId: number, countries: Country[]): number {
    let filteredCountries: Country[];
    filteredCountries = countries.filter(country => countryId == country.id);
    return filteredCountries.length > 0 ? filteredCountries[0].code : 0;
  }
}
