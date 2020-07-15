import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Project } from '../project';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProjectSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project) {}

  ngOnInit(): void {
  }

  exitSettings() {
    this.dialogRef.close();
  }
}
