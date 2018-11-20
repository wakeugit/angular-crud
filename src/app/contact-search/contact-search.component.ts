import { ContactService } from './../services/contacts/contact.service';
import { Contact } from './../models/contact';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent implements OnInit {

  @Output() updateList: EventEmitter<Observable<Contact[]>> = new EventEmitter();

  searchItems = new Subject<string>();
  contacts$: Observable<Contact[]>;

  search(item: string):void{
    console.log("searching ...")
    this.searchItems.next(item);
  }

  constructor(private _contactService: ContactService) { }

  ngOnInit() {
    this.contacts$ = this.searchItems.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap(
        (term: string) => this._contactService.searchContacts(term)
          /*console.log("switchMap searching ...")
          this.updateList.emit(this._contactService.searchContacts(term));
          return this._contactService.searchContacts(term)*/
        
      ),
    );
  }

}
