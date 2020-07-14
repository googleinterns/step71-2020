import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects$: Observable<Project[]>;
  private currentProject: Project;

  constructor(private firestore: AngularFirestore) { 
    this.projects$ = firestore.collection<Project>('projects').valueChanges();
  }

  public getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  public setCurrentProject(project: Project): void {
    this.currentProject = project;
  }

  public getCurrentProject(): Observable<Project> {
    return of(this.currentProject);
  }

  public getProject(title: string): Observable<Project> {
    console.log(title);
    return this.firestore.collection("projects").doc<Project>(title).valueChanges();
  }

  public addProject(project: Project): void {
    this.firestore.collection<Project>("projects").doc(project.title).set(project)
    .catch(error => console.error("Error adding document: ", error));
  }
}
