import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects$: Observable<Project[]>;
  private currentProject: Project;
  private blobstoreUploadUrl: string;

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
  ) { 
    this.projects$ = firestore.collection<Project>('projects').valueChanges();
    httpClient.get<string>('/blobstore-upload-url').pipe(
        switchMap(url => this.blobstoreUploadUrl = url)
      )
      .subscribe(result => this.blobstoreUploadUrl = result);
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

  public uploadFile(project: Project, file: File): void {
    const formData: FormData = new FormData();
    formData.append('project', project.title);
    formData.append('file', file, file.name);
    this.httpClient
    .post(this.blobstoreUploadUrl, formData)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log("Error uploading file: " + error)
    )
  }
}
