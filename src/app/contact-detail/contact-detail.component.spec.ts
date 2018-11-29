import { MatSelectModule } from '@angular/material/select';
import { InMemoryDataService } from './../services/InMemoryData/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ContactService } from './../services/contacts/contact.service';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ContactDetailComponent } from './contact-detail.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let contactService: ContactService;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule, 
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        ),
      ],
      declarations: [ContactDetailComponent, ContactFormComponent],
      providers: [
        ContactService, { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 1 })) } }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    contactService = TestBed.get(ContactService);
    activatedRoute = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});