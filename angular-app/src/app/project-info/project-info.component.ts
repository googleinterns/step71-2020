import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css',
    '../app.component.css']
})
export class ProjectInfoComponent implements OnInit, OnChanges {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
