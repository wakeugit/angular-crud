import { Contact } from './../../models/contact';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(){ }

  createDb() {
    const contacts = [
      {
        id: 1,
        name: "Dummy1",
        countryId: 1,
        phone: 176000001,
        email: "dummy@dum.de",
        birthday: new Date("2000-01-01")
      },
      {
        id: 2,
        name: "Dummy2",
        countryId: 1,
        phone: 176000002,
        email: "dummy2@dum.de",
        birthday: new Date("2000-02-02")
      },
      {
        id: 3,
        name: "Dummy3",
        countryId: 1,
        phone: 176000003,
        email: "dummy3@dum.de",
        birthday: new Date("2000-03-03")
      },
      {
        id: 4,
        name: "Dummy4",
        countryId: 1,
        phone: 176000004,
        email: "dummy4@dum.de",
        birthday: new Date("2000-04-04")
      },
      {
        id: 5,
        name: "Dummy5",
        countryId: 1,
        phone: 176000005,
        email: "dummy6@dum.de",
        birthday: new Date("2000-06-06")
      },
      {
        id: 6,
        name: "Dummy6",
        countryId: 1,
        phone: 176000006,
        email: "dummy6@dum.de",
        birthday: new Date("2000-06-06")
      },
      {
        id: 7,
        name: "Dummy7",
        countryId: 1,
        phone: 176000007,
        email: "dummy7@dum.de",
        birthday: new Date("2000-07-07")
      },
      {
        id: 8,
        name: "Dummy8",
        countryId: 1,
        phone: 176000008,
        email: "dummy8@dum.de",
        birthday: new Date("2000-08-08")
      },
      {
        id: 9,
        name: "Dummy9",
        countryId: 1,
        phone: 176000009,
        email: "dummy9@dum.de",
        birthday: new Date("2000-09-09")
      },
      {
        id: 10,
        name: "Dummy10",
        countryId: 1,
        phone: 176000000,
        email: "dummy10@dum.de",
        birthday: new Date("2000-10-10")
      }
    ];

    const countries = [
      {
        id: 1,
        name: "Germany",
        code: 49
      },
      {
        id: 2,
        name: "Cameroon",
        code: 237
      },
      {
        id: 3,
        name: "France",
        code:33
      }
    ];
    return {'contacts' : contacts, 'countries': countries};
  }

  // Overrides the genId method to ensure that a contact always has an id.
  // If the contacts array is empty,
  // the method below returns the initial number (1).
  // if the contacts array is not empty, the method below returns the highest
  //  id + 1.
  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1;
  }
}
