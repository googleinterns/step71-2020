import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  public message: string;
  public cancelText: string;
  public continueText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.message = data.message ? data.message : "Are you sure you want to continue?";
    this.cancelText = data.cancelText ? data.cancelText : "Cancel";
    this.continueText = data.continueText ? data.continueText : "Continue";
  }

  ngOnInit(): void {
  }
}
