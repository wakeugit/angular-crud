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
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  getContactById(id: number): Observable<Contact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url);
  }

  deleteContact(contact: Contact | number): Observable<Contact>{
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact>(url);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, httpOptions);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.contactsUrl, contact, httpOptions);
  }

  searchContacts(term: String): Observable<Contact[]>{
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return this.getContacts();
    }
    const url = `${this.contactsUrl}/?name=${term}`;
    return this.http.get<Contact[]>(url)
  }
  constructor(private http: HttpClient) { }
}
