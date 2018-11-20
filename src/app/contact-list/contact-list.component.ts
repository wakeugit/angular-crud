import { ContactModalComponent } from './../contact-modal/contact-modal.component';
import { Observable } from 'rxjs';
import { Component, OnInit, } from '@angular/core';
import { Contact } from '../models/contact';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ContactService } from '../services/contacts/contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contact: Contact;
  favoriteContact: Contact;
  contacts : Contact[];
  displayedColumns: string[] = ['name', 'phone', 'email', 'birthday'];

  // MatPaginator Inputs
  //length = this.contacts$.;
  length = 20;
  length_page = 10;
  pageSize = this.length % this.length_page + 1;


  pageSizeOptions: number[] = [5, 10, this.length];

  // MatPaginator Output
  pageEvent: PageEvent;

  //@ViewChild(MatPaginator) paginator: MatPaginator;

  contacts$ : Observable<Contact[]>;

  constructor(
    private _router: Router, 
    private _contactService: ContactService,
    public dialog: MatDialog) {  }

  ngOnInit() {
    //this.getContacts();
    this.contacts$ = this._contactService.getContacts();
  }

  onClick(contact: Contact): void {
    console.log(contact);
  }

  getContacts(): void {
    this._contactService.getContacts().subscribe(
      contacts => this.contacts = contacts
    )
  }

  updateList(contacts$ : Observable<Contact[]>){
    this.contacts$ = contacts$;
  }

  redirect(contact: Contact): void {
    this._router.navigate(['/detail', contact.id])
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}