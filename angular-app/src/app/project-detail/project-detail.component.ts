import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from '../project';
import { ProjectFile } from '../project-file';
import { ProjectService } from '../project.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

  private blobstoreUploadUrl: string;
  @Input() project$: Observable<Project>;
  files$: Observable<ProjectFile[]>;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setBlobstoreUploadUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentProject$: Observable<Project> = changes.project$.currentValue;
    if (currentProject$) {
      currentProject$.subscribe(project => {
        this.files$ = this.projectService.getProjectFiles(project.title);
      });
    }

  }

  setBlobstoreUploadUrl(): void {
    this.projectService.getBlobstoreUploadUrl().pipe(
      first()
    ).subscribe(
      url => { 
        this.blobstoreUploadUrl = url;
        console.log("blobstore upload URL set");
      },
      error => console.log("Error getting blobstore upload URL: " + error)
    );
  }

  upload(project, event): void {
    if (event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.projectService.uploadFile(this.blobstoreUploadUrl, project, file);
      event.target.value = '';
    }
    this.setBlobstoreUploadUrl();
  }

  deleteFile(project: Project, file: ProjectFile) {
    this.projectService.deleteFile(project, file);
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
