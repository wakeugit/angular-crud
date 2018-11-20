import { Contact } from './../models/contact';
import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {

  mode:string;

  @Output() newListContact: EventEmitter<Contact> = new EventEmitter()

  constructor(public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact) {}

  cancel(): void {
    this.dialogRef.close();
  }

  handleNewContact(contact: Contact):void{
    this.newListContact.emit(contact);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mode="create"
  }

}
