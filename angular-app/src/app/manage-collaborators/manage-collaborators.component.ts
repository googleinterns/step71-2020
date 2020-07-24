import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-manage-collaborators',
  templateUrl: './manage-collaborators.component.html',
  styleUrls: ['./manage-collaborators.component.css']
})
export class ManageCollaboratorsComponent implements OnInit {
  public project: Project;
  public collaboratorId: string;
  public tableColumns = ['uid', 'role'];

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ManageCollaboratorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
    data.subscribe(project => this.project = project);
  }

  ngOnInit(): void {
  }

  addCollaborator(): void {
    if ((this.collaboratorId || '').trim()) {
      this.projectService.updateProject(this.project, { [`roles.${this.collaboratorId}`]: "editor" });
    }
    this.collaboratorId = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
