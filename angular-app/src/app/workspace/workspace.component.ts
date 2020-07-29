import { Component, OnInit, ViewChild } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable, Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { Project } from '../project';
import { ProjectFile } from '../project-file';
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
  public files$: Observable<ProjectFile[]>;

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

    private currProjId;

    public context;
    public wavesurfer;

    public hasFileChanged: boolean = false;

    public audioFileToUpload: File = null;

  ngOnInit() {

    this.setBlobstoreUploadUrl();

    this.context = new AudioContext();

    this.waveHTML = document.getElementById("wave-html");
    this.uploadHTML = document.getElementById("wave-upload-html");

    this.context.resume();

    this.initProject();
  }

    initProject(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        let projectId = params.get('id');
        this.currProjId = projectId;
        if (projectId !== null && projectId.length > 0) {
          this.project$ = this.projectService.getProject(projectId);
          this.files$ = this.projectService.getProjectFiles(projectId);
        }
        else {
          this.project$ = null;
        }
      });
    }

    saveLyrics() {
        var lyricDoc = (document.getElementById("lyric-doc") as HTMLInputElement);
        this.projectService.updateLyricDoc(this.currProjId, lyricDoc.value);
    }

    getLatestLyrics(project) {
        var lyrics = project.lyricsContent;
        var lyricDoc = document.getElementById("lyric-doc");
        lyricDoc.innerHTML = lyrics;
    }
  
    randomColor(): String {

        let colors: string[] = ['#FF2D00', '#001FFF', '#009688']; // red, blue, green

        var randNum = Math.floor(Math.random() * Math.floor(3));

        return colors[randNum];

    }

    setAudioFileName(file) {
        var audioName = document.getElementById("audio-name");
        audioName.innerHTML = file.filename;
    }

    displayAudioFile(file) {
        this.waveHTML.innerHTML = "";
        this.uploadHTML.innerHTML = "";

        
        this.removeLastWaveform();
        this.context.resume();
        this.setAudioFileName(file);

        this.wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        waveColor : this.randomColor(),
        backgroundColor: '#303030',
        scrollParent: true,
        progressColor: 'purple',
        });
        this.wavesurfer.load(file.fileUrl);
    }

    removeLastWaveform() {
        var waveContainer = document.getElementById("wave-container");
        waveContainer.innerHTML = "";
    }

    play() {
        const playButton = document.getElementById("play");
        const pauseButton = document.getElementById("pause");

        if (!this.checkIfPlaying()) {
            playButton.classList.add("hidden");
            pauseButton.classList.remove("hidden");
        }

        this.wavesurfer.playPause();
    }

    pause() {
        const playButton = document.getElementById("play");
        const pauseButton = document.getElementById("pause");

        if (this.checkIfPlaying()) {
            playButton.classList.remove("hidden");
            pauseButton.classList.add("hidden");
        }

        this.wavesurfer.playPause();
    }

    checkIfPlaying(): boolean {
        return this.wavesurfer.isPlaying();
    }
    

    removeErrorText() {
        this.waveHTML.innerHTML = "";
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


    newProject() : void {
        const dialogRef = this.dialog.open(CreateProjectDialogComponent);
    }

    setBlobstoreUploadUrl(): void {
        this.projectService.getBlobstoreUploadUrl().pipe(
        first()
        ).subscribe(
            url => { 
                this.blobstoreUploadUrl = url;
            },
            error => console.log("Error getting blobstore upload URL: " + error)
        );
    }

    skipBack() {
        this.wavesurfer.skipBackward(5);
    }

    skipForward() {
        this.wavesurfer.skipForward(5);
    }



}
