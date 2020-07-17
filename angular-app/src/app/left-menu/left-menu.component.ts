import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../auth.service';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
  }
}