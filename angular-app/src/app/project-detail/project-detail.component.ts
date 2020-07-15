import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from '../project';
import { ProjectFile } from '../project-file';
import { ToggleRightDrawerService } from '../toggle-right-drawer.service';
import { ProjectService } from '../project.service';
import { ProjectSettingsComponent } from '../project-settings/project-settings.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private blobstoreUploadUrl: string;
  project$: Observable<Project>;
  files$: Observable<ProjectFile[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private toggleRightDrawerService: ToggleRightDrawerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let title = params.get('id');
      if (title !== null && title.length > 0) {
        this.project$ = this.projectService.getProject(title);
        this.files$ = this.projectService.getProjectFiles(title);
      }
    });
    this.setBlobstoreUploadUrl();
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

  openDialog(project): void {
    this.dialog.open(ProjectSettingsComponent, { data: project });
  }

  toggleRightDrawer(): void {
    this.toggleRightDrawerService.toggle();
  }

  upload(project, event): void {
    if (event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.projectService.uploadFile(this.blobstoreUploadUrl, project, file);
      event.target.value = '';
    }
    this.setBlobstoreUploadUrl();
  }
}
