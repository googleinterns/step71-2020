import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }

    public context = new AudioContext();
    public wavesurfer;

    public hasFileChanged: boolean = false;

    public audioFileToUpload: File = null;

  ngOnInit() {
    this.getAudioName();
    this.context.resume();
    if (this.audioFileToUpload == null) {
        document.getElementById("wave-html").innerHTML = "Upload Audio File";
    } else {
        this.loadWaveSurfer(this.audioFileToUpload);
    }
  }

    playPause() {
        this.wavesurfer.playPause();
    }

    upload() {
        if (this.hasFileChanged) {
            document.getElementById("wave-upload-html").innerHTML = "";
            this.loadWaveSurfer(this.audioFileToUpload);
        }
    }

    removeErrorText() {
        document.getElementById("wave-html").innerHTML = "";
    }

    handleFileInput(files: FileList) {
        this.hasFileChanged = true;
        this.audioFileToUpload = files.item(0);
        this.getAudioName();
        this.removeErrorText();
        document.getElementById("wave-upload-html").innerHTML = "Please Select the Upload Button";
    }

    loadWaveSurfer(audio) {
        this.wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        waveColor : 'red',
        backgroundColor: 'black',
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
}
