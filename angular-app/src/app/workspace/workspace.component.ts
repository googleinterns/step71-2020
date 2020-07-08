import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }

    public audiofile = '../../assets/audio.wav';
    public context = new AudioContext();
    public wavesurfer;

    public audioFileToUpload: File = null;

  ngOnInit() {
    this.getAudioName();
    this.context.resume();
    this.wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        waveColor : 'red',
        scrollParent: true,
        progressColor: 'purple',
    });

    this.wavesurfer.load(this.audiofile);
  }

    myFunction() {
        this.wavesurfer.playPause();
    }

    handleFileInput(files: FileList) {
        this.audioFileToUpload = files.item(0);
        this.getAudioName();
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
