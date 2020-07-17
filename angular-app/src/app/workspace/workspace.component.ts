import { Component, OnInit, ViewChild } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable, Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { Project } from '../project';
import { ProjectService } from '../project.service';

import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  @ViewChild('projectInfo') public projectInfo: MatSidenav;

  public project$: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

    private blobstoreUploadUrl: string;

    public waveHTML : HTMLElement;
    public uploadHTML : HTMLElement;
    public projectTitle : HTMLElement;

    public context = new AudioContext();
    public wavesurfer;

    public hasFileChanged: boolean = false;

    public audioFileToUpload: File = null;

  ngOnInit() {

    this.setBlobstoreUploadUrl();

    this.waveHTML = document.getElementById("wave-html");
    this.uploadHTML = document.getElementById("wave-upload-html");

    this.getAudioName();
    this.context.resume();
    if (this.audioFileToUpload == null) {
        this.waveHTML.innerHTML = "Upload Audio File";
    } else {
        this.loadWaveSurfer(this.audioFileToUpload);
    }
    this.initProject();
  }

    initProject(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        let projectId = params.get('id');
        if (projectId !== null && projectId.length > 0) {
          this.project$ = this.projectService.getProject(projectId);
        }
        else {
          this.project$ = null;
        }
      });
    }


    playPause() {
        this.wavesurfer.playPause();
    }

    upload() {
        if (this.hasFileChanged) {
            this.uploadHTML.innerHTML = "";
            this.loadWaveSurfer(this.audioFileToUpload);
        }
    }

    removeErrorText() {
        this.waveHTML.innerHTML = "";
    }

    handleFileInput(files: FileList) {
        this.hasFileChanged = true;
        this.audioFileToUpload = files.item(0);
        this.getAudioName();
        this.removeErrorText();
        this.uploadHTML.innerHTML = "Please Select the Upload Button";
    }

    loadWaveSurfer(audio) {
        this.wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        waveColor : 'red',
        backgroundColor: '#303030',
        scrollParent: true,
        progressColor: 'purple',
        });
        this.wavesurfer.loadBlob(audio);
    }

    getAudioName() {
        var audioName = document.getElementById("audio-name");
        if (this.audioFileToUpload == null) {
            audioName.innerHTML = "Please Select an Audio File to Upload";
        } else {
            audioName.innerHTML = this.audioFileToUpload.name;
        }
    }

    newProject() : void {
        const dialogRef = this.dialog.open(CreateProjectDialogComponent);
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
}
