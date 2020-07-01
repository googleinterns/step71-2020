import { Component, OnInit } from '@angular/core';
import WaveSurfer from './wavesurfer.js';



@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor() { }

    public wavesurfer: WaveSurfer;

  ngOnInit(): void {
    let audiofile = './gtr-jazz-3.mp3';
    this.wavesurfer = WaveSurfer.create({
        container: '#wave-container',
        height:100,
        waveColor : 'red',
        scrollParent: true,
        progressColor: 'purple',
    });
    this.wavesurfer.load(audiofile);
  }

}
