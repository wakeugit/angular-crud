import { Contact } from './../../models/contact';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = '/api/contacts';  // URL to web api

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap( 
        data => console.log("fetched contacts"),
        error => console.log("error by fetching contacts "+error))
    );
  }

  getContactById(id: number): Observable<Contact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(
        data => console.log("fetched contact"),
        error => console.log("error by fetching contact "+error))
    )
  }

  deleteContact(contact: Contact | number): Observable<Contact>{
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact>(url).pipe(
      tap(
        data => console.log("deleted contact"),
        error => console.log("error by deleting contact "+error))
    )
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
      tap( 
        data => console.log("contact added"),
        error => console.log("error by adding new contact "+error))
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.contactsUrl, contact, httpOptions).pipe(
      tap( 
        data => console.log("contact updated"),
        error => console.log("error by updating new contact "+error))
    );
  }

  searchContacts(term: String): Observable<Contact[]>{
    console.log("search contact");
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.contactsUrl}/?name=${term}`;
    return this.http.get<Contact[]>(url).pipe(
      tap(
        data => console.log("search contact"),
        error => console.log("error by searching contact "+error))
    )
  }
  constructor(private http: HttpClient) { }
}
