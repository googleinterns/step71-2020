import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }

    public waveHTML : HTMLElement;
    public uploadHTML : HTMLElement;

    public context = new AudioContext();
    public wavesurfer;

    public hasFileChanged: boolean = false;

    public audioFileToUpload: File = null;

  ngOnInit() {
    
    this.waveHTML = document.getElementById("wave-html");
    this.uploadHTML = document.getElementById("wave-upload-html");

    this.getAudioName();
    this.context.resume();
    if (this.audioFileToUpload == null) {
        this.waveHTML.innerHTML = "Upload Audio File";
    } else {
        this.loadWaveSurfer(this.audioFileToUpload);
    }
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

    newProject() {
        var new_prompt = document.getElementById("new-workspace-prompt");
        var project = document.getElementById("workspace-content");

        new_prompt.classList.add("hidden");
        project.classList.remove("hidden");
    }
}
