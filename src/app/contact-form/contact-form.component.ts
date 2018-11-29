import { FeedbackComponent } from './../feedback/feedback.component';
import { Country } from './../models/country';
import { CountryService } from './../services/countries/country.service';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../services/contacts/contact.service';
import { MatSnackBar } from '@angular/material';

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

  countries: Country[] = [];
  telPrefix: number;

  constructor(private _router: Router, private _contactService: ContactService, private _countryService: CountryService, public snackBar: MatSnackBar) { }

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(FeedbackComponent, {
      duration: 3000,
      data: data
    });
  }

  ngOnInit() {
    this.initForm(this.contact);
  }

  initForm(contact: Contact) {

    this._countryService.getCountries()
      .subscribe(countries => {
        this.countries = countries
        let filteredCountries: Country[];
        if (contact) {
          filteredCountries = this.countries.filter(country => contact.countryId == country.id);
          if (filteredCountries.length > 0) {
            this.telPrefix = filteredCountries[0].code;
          }
        }
      })


    this.contactForm = new FormGroup(
      {
        name: new FormControl(contact == null ? '' : contact.name, [
          Validators.required
        ]),
        countryId: new FormControl(contact == null ? '' : contact.countryId, [
          Validators.required,
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

  onCountryChange() {
    let filteredCountries: Country[];
    filteredCountries = this.countries.filter(country => this.contactForm.value.countryId == country.id);
    if (filteredCountries.length > 0) {
      this.telPrefix = filteredCountries[0].code;
    }
  }

  submitContact(): void {

    let contact = new Contact(
      this.contactForm.value.name,
      this.contactForm.value.countryId,
      this.contactForm.value.phone,
      this.contactForm.value.email,
      new Date(this.contactForm.value.birthday)
    );

    this._contactService.createContact(contact).subscribe(
      contact => {
        this.contactForm.reset();
        this.newContact.emit(contact);
        let data = {
          message: "Contact " + contact.name + " added !!!",
          messageType: "success"
        }
        this.openSnackBar(data);
        return contact
      },
      err => {
        console.log(err);
        let data = {
          message: "Contact " + contact.name + " couldn't be added. \n Error " + err.status + ": "+err.statusText,
          messageType: "error"
        }
        this.openSnackBar(data);
        return err
      }
    );
  }

  updateContact(): void {

    let contact = new Contact(
      this.contactForm.value.name,
      this.contactForm.value.countryId,
      this.contactForm.value.phone,
      this.contactForm.value.email,
      new Date(this.contactForm.value.birthday)
    );
    contact.id = this.contact.id;

    this._contactService.updateContact(contact).subscribe(
      contact => {
        this.contactForm.reset();
        this._router.navigate(['/list']);
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
