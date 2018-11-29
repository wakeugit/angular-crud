import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  message: string;
  messageType: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    
  }

  ngOnInit() {
    this.message = this.data.message;
    this.messageType = this.data.messageType;
  }

}
