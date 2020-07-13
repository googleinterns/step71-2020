import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { ToggleChatService } from '../toggle-chat.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private files: string[] = ['audio.wav', 'audio.mp3', 'lyric1.txt', 'lyric2.docx']
  project$: Observable<Project>; // $ postfix simply indicates an Observable and has no function

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private chatService: ToggleChatService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("opening project detail view")
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectService.getProject(params.get('id')))
    );
  }

  openDialog(): void {
    const dialogRed = this.dialog.open(ProjectSettingsDialog, { data: this.project$ });
  }

  toggleChat(): void {
    console.log("toggling chat");
    this.chatService.toggle();
  }

  upload(project, event): void {
    let file: File = event.target.files[0];
    this.projectService.uploadFile(project, file);
  }
}

@Component({
  selector: 'app-project-settings-dialog',
  templateUrl: 'project-settings-dialog.html',
})
export class ProjectSettingsDialog {

  constructor(
    public dialogRef: MatDialogRef<ProjectSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public project$: Observable<Project>) {}

  exitSettings() {
    this.dialogRef.close();
  }
}
