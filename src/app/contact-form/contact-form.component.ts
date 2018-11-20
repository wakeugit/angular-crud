import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../services/contacts/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() contact: Contact;
  @Input() mode: string;

  @Output() newContact: EventEmitter<Contact> = new EventEmitter();

  contactForm: FormGroup;

  constructor(private _router: Router, private _contactService: ContactService) { }

  ngOnInit() {
    this.initForm(this.contact);
  }

  initForm(contact: Contact) {

    this.contactForm = new FormGroup(
      {
        name: new FormControl(contact == null ? '' : contact.name, [
          Validators.required
        ]),
        phone: new FormControl(contact == null ? '' : contact.phone, [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]),
        email: new FormControl(contact == null ? '' : contact.email, [
          Validators.email,
        ]),
        birthday: new FormControl(contact == null ? '' : contact.birthday),
      }
    );
  }

  submitContact(): void {

    let contact = new Contact(
      this.contactForm.value.name,
      this.contactForm.value.phone,
      this.contactForm.value.email,
      new Date(this.contactForm.value.birthday)
    );

    this._contactService.createContact(contact).subscribe(
      contact => {
        this.contactForm.reset();
        this.newContact.emit(contact);
        console.log("Success");
        return contact
      },
      err => { console.log(err); return err }
    );
  }

  updateContact(): void {

    let contact = new Contact(
      this.contactForm.value.name,
      this.contactForm.value.phone,
      this.contactForm.value.email,
      new Date(this.contactForm.value.birthday)
    );
    contact.id = this.contact.id;

    this._contactService.updateContact(contact).subscribe(
      contact => {
        this.contactForm.reset();
        console.log("Success Update");
        this._router.navigate(['/list'])
        return contact
      },
      err => { console.log(err); return err }
    );
  }

  deleteContact(id: number): void {
    this._contactService.deleteContact(id).subscribe(
      contact => {
        console.log("Success Delete");
        this._router.navigate(['/list'])
        return contact
      },
      err => { console.log(err); return err }
    );
  }

}
