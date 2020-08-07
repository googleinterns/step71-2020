import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-manage-collaborators',
  templateUrl: './manage-collaborators.component.html',
  styleUrls: ['./manage-collaborators.component.css']
})
export class ManageCollaboratorsComponent implements OnInit {
  public project: Project;
  public collaborators$: Observable<Profile[]>;
  public collaboratorId: string;
  public tableColumns = ['uid', 'role'];

  constructor(
    private profileService: ProfileService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ManageCollaboratorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.data.subscribe(project => {
      this.project = project;
      this.collaborators$ = this.profileService.getProfiles(Object.keys(this.project.roles));
    });
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
