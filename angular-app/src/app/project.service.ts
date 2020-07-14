import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Project } from './project';
import { ProjectFile } from './project-file';

const COLLECTION_PROJECTS: string = "projects";
const COLLECTION_FILES: string = "files";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects$: Observable<Project[]>;
  private currentProject$: Subject<Observable<Project>>;

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
  ) { 
    this.projects$ = firestore.collection<Project>('projects').valueChanges();
  }

  public getBlobstoreUploadUrl(): Observable<string> {
    return this.httpClient.get('/blobstore-upload-url', {responseType: 'text'});
  }

  public getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  public setCurrentProject(id: string): void {
    this.currentProject$.next(this.getProject(id));
  }

  /* Subscribe to the returned Subject to get a Project Observable */
  public getCurrentProject(): Subject<Observable<Project>> {
    return this.currentProject$;
  }

  public getProject(id: string): Observable<Project> {
    return this.firestore.collection(COLLECTION_PROJECTS).doc<Project>(id).valueChanges();
  }

  public getProjectFiles(id: string): Observable<ProjectFile[]> {
    return this.firestore.collection(COLLECTION_PROJECTS).doc<Project>(id).collection<ProjectFile>(COLLECTION_FILES).valueChanges();
  }

  public addProject(project: Project): void {
    this.firestore.collection<Project>(COLLECTION_PROJECTS).doc(project.title).set(project)
    .catch(error => console.error("Error adding document: ", error));
  }

  public uploadFile(blobstoreUploadUrl: string, project: Project, file: File): void {
    const formData: FormData = new FormData();
    formData.append('project', project.title);
    formData.append('filename', file.name);
    formData.append('file', file, file.name);
    this.httpClient
    .post(blobstoreUploadUrl, formData)
    .subscribe(
      (response) => console.log("Successfully uploaded " + file.name),
      (error) => console.log("Error uploading file: " + error.message)
    )
  }
}
