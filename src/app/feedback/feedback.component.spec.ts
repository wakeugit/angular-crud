import { MatSnackBarModule } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatSnackBarModule],
      declarations: [ FeedbackComponent ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA,
          useValue: {
            message: "success",
            messageType: "success"
          }
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
