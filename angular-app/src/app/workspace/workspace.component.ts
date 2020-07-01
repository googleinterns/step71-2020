import { Component, OnInit } from '@angular/core';
import WaveSurfer from './wavesurfer.js';
var wavesurfer = Object.create(WaveSurfer);


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }

    public audiofile = "audio.wav";
    public context = new AudioContext();

  ngOnInit(): void {
    this.context.resume();
    console.log("works");
    wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        height:100,
        waveColor : 'red',
        scrollParent: true,
        progressColor: 'purple',
    });
    wavesurfer.load(this.audiofile);
  }
 

}

