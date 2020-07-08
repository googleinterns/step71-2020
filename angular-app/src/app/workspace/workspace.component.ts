import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from '../../assets/js/wavesurfer.js';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }
    public audiofile = '../../assets/audio.mp3';
    public context = new AudioContext();
    public wavesurfer;

  ngOnInit() {
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

}
