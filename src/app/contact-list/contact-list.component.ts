import { ContactModalComponent } from './../contact-modal/contact-modal.component';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../models/contact';
import { PageEvent, MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
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
  contacts: Contact[] = [];
  contacts$: Observable<Contact[]>;

  displayedColumns: string[] = ['name', 'phone', 'email', 'birthday'];

  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _router: Router,
    private _contactService: ContactService,
    public dialog: MatDialog) {  }

  ngOnInit() {
    //this.getContacts();
    this.contacts$ = this._contactService.getContacts();
    this.contacts$.subscribe(
      data => {
        this.contacts = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onClick(contact: Contact): void {
    
  }

  getContacts(): void {
    this._contactService.getContacts().subscribe(
      contacts => this.contacts = contacts
    )
  }

  updateList(contacts$: Observable<Contact[]>) {
    this.contacts$ = contacts$;
    this.contacts$.subscribe(
      data => {
        this.contacts = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
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
      this.ngOnInit();
    });
  }

}