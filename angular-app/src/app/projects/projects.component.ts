import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../app.component.css',
    './projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = PROJECTS;
  selectedProject: Project;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

}
