import { HttpClientModule } from '@angular/common/http';
import { Contact } from './../../models/contact';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { CONTACTS } from 'src/app/appConstants/appConstants';

describe('ContactService', () => {
  let service: ContactService;
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    service = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });

  it('should get the default list of contacts', () => {
    service = TestBed.get(ContactService);
    let contacts: Contact[];
    service.getContacts().subscribe(
      data => {
        contacts = data;
        expect(CONTACTS.length).toEqual(contacts.length)
        contacts.forEach(item => {
          expect(CONTACTS).toContain(item)
        })
      }
    );
  });

  it('should the element with id = 1 from the default list of contacts', () => {
    service = TestBed.get(ContactService);
    let contact: Contact;
    service.getContactById(1).subscribe(
      data => {
        contact = data;
        expect(CONTACTS[0].id).toEqual(contact.id)
        expect(CONTACTS[0].name).toEqual(contact.name)
      }
    );
  })

  it('should add a new contact to the default list of contacts', () => {
    service = TestBed.get(ContactService);
    let contact = new Contact(
      "Wilfried",
      1,
      1234556678,
      "wilfried@wakeu.de",
      new Date("1993-10-24")
    );
    service.createContact(contact).subscribe(
      data => {
        expect(data.id).toBeTruthy();
      }
    );
  })

  it('should update the contact with id = 1 in the default list of contacts', () => {
    service = TestBed.get(ContactService);
    let contact = new Contact(
      "Wilfried",
      1,
      1234556678,
      "wilfried@wakeu.de",
      new Date("1993-10-24")
    );
    contact.id=1;

    service.updateContact(contact).subscribe(
      data => {
        expect(data.name).toEqual("Wilfried");
      }
    );
  })
});


