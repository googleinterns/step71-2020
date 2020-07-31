import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Project } from './project';
import { ProjectFile } from './project-file';

const COLLECTION_PROJECTS: string = "projects";
const COLLECTION_FILES: string = "files";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private user: firebase.User;
  private projects$: Observable<Project[]>;
  private currentProject$: Subject<Observable<Project>>;

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) { 
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.projects$ = firestore.collection<Project>('projects', 
        ref => ref.where("roles." + this.user.uid, "in", ["owner", "editor"])
      ).valueChanges({ idField: "projectId" });
    });
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

  public updateLyricDoc(id: string, text: string): void {
    this.firestore.collection(COLLECTION_PROJECTS).doc<Project>(id).update({
      lyricsContent: text
    });
  }

  public addProject(project: Project): void {
    this.firestore.collection<Project>(COLLECTION_PROJECTS).doc(project.title).set(project)
    .catch(error => console.error("Error adding document: ", error));
  }

  public updateProject(project: Project, changes: object): void {
    this.firestore.collection<Project>(COLLECTION_PROJECTS).doc(project.title).update(changes)
    .catch(error => console.error("Error updating document: ", error));
  }

  public deleteProject(project: Project) {
    this.firestore.collection(COLLECTION_PROJECTS).doc(project.title).delete()
      .then(() => console.log(`Successfully deleted project ${project.title}`))
      .catch(error => console.error(`Error deleting project ${project.title}: `, error));
  }

  // Returns true on completion
  public uploadFile(blobstoreUploadUrl: string, project: Project, file: File): Subscription {
    const formData: FormData = new FormData();
    formData.append('project', project.title);
    formData.append('filename', file.name);
    formData.append('file', file, file.name);
    return this.httpClient
      .post(blobstoreUploadUrl, formData)
      .pipe(first())
      .subscribe(
        (response) => console.log("Successfully uploaded " + file.name),
        (error) => {
          console.log("Error uploading file: " + error.message);
          this.snackBar.open("Encountered an error while uploading " + file.name, "Dismiss", { duration: 3000 });
        }
      );
  }

  public deleteFile(project: Project, file: ProjectFile): void {
    this.firestore.collection(COLLECTION_PROJECTS).doc(project.title).collection(COLLECTION_FILES).doc(file.filename).delete()
    .then(() => console.log(`Successfully deleted file ${file.filename}`))
    .catch(error => console.error(`Error deleting ${file.filename}: `, error));
  }
}
