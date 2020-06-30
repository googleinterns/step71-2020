import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = PROJECTS;
  private currentProject: Project;

  constructor() { }

  public setCurrentProject(project: Project): void {
    this.currentProject = project;
  }

  public getCurrentProject(): Observable<Project> {
    return of(this.currentProject);
  }

  public getProject(title: string): Observable<Project> {
    console.log(title);
    return of(this.projects.find(project => project.title === title));
  }
}
