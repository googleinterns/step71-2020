import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {

  private user;
  public title: string;
  public collaborators: string[] = [];
  public tags: string[] = [];
  public lyricsFileName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>) { }

  ngOnInit(): void {
    this.authService.getUser().pipe(first(),).subscribe(user => this.user = user);
  }

  createProject(): void {
    let roles = {};
    roles[this.user.uid] = "owner";
    for (let collaborator of this.collaborators) {
      roles[collaborator] = "editor";
    }

    this.projectService.addProject({
      title: this.title,
      roles: roles,
      tags: this.tags,
      files: [],
      lyricsFileName: this.lyricsFileName,
      lyricsContent: ""
    });

    this.dialogRef.close();
    this.router.navigate(['/workspace', this.title]);
  }

  addCollaborator(element): void {
    this.add(this.collaborators, element);
  }

  removeCollaborator(collaborator: string): void {
    this.remove(this.collaborators, collaborator);
  }

  addTag(element): void {
    this.add(this.tags, element);
  }

  removeTag(tag: string): void {
    this.remove(this.tags, tag);
  }

  add(list: string[], element): void {
    let cleaned = (element.value || '').trim();
    if (cleaned && list.findIndex(element => element === cleaned) === -1) {
      list.push(cleaned);
    }
    if (element) {
      element.value = '';
    }
  }

  remove(list: string[], item: string): void {
    const index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
    }
  }
}
