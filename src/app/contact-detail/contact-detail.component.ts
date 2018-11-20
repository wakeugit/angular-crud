import { ContactService } from './../services/contacts/contact.service';
import { Contact } from './../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  contact$: Observable<Contact>;
 
  constructor(
    private _route: ActivatedRoute,
    private _contactService: ContactService) { }

  ngOnInit() {

    this.contact$ = this._route.paramMap.pipe(
      switchMap(
        (param: ParamMap) => this._contactService.getContactById(parseInt(param.get('id')))
      )
    )
  }

  getContactById(id: number): void {
    this._contactService.getContactById(id).subscribe(
      contact => this.contact = contact
    )
  }

}
