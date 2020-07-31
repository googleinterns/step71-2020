import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from '../project';
import { ProjectFile } from '../project-file';
import { ProjectService } from '../project.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ManageCollaboratorsComponent } from '../manage-collaborators/manage-collaborators.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

  @Input() project$: Observable<Project>;
  public files$: Observable<ProjectFile[]>;
  public isUploading: boolean;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isUploading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentProject$: Observable<Project> = changes.project$.currentValue;
    if (currentProject$) {
      currentProject$.subscribe(project => {
        this.files$ = this.projectService.getProjectFiles(project.title);
      });
    }
  }

  upload(project, event): void {
    this.isUploading = true;
    this.projectService.getBlobstoreUploadUrl().pipe(first())
    .subscribe(
      blobstoreUploadUrl => { 
        console.log("blobstore upload URL received");
        if (event.target.files.length > 0) {
          let file: File = event.target.files[0];
          this.projectService.uploadFile(blobstoreUploadUrl, project, file)
            .add(() => this.isUploading = false);
          event.target.value = '';
        }
      },
      error => {
        console.error("Error getting blobstore upload URL: ", error);
        this.isUploading = false;
      });
  }

  deleteFile(project: Project, file: ProjectFile) {
    this.projectService.deleteFile(project, file);
  }

  manageCollaborators(): void {
    this.dialog.open(ManageCollaboratorsComponent, { 
      width: '400px',
      data: this.project$,
    });
  }

  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message:`Deleting ${project.title} will permanently delete the project and all of its files. 
      Are you sure you want to continue?`,
        continueText: "Delete"
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed === "confirm") {
        console.log("deleting project: " + project.title);
        this.projectService.deleteProject(project);
      } else {
        console.log("project deletion canceled");
      }
    });
  }
}
