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
  public lyricFileName: string;

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
      lyricsFileName: this.lyricFileName,
      lyricsContent: ""
    });

    this.dialogRef.close();
    this.router.navigate(['/workspace', this.title]);
  }

  addCollaborator(event: MatChipInputEvent): void {
    this.add(this.collaborators, event);
  }

  removeCollaborator(collaborator: string): void {
    this.remove(this.collaborators, collaborator);
  }

  addTag(event: MatChipInputEvent): void {
    this.add(this.tags, event);
  }

  removeTag(tag: string): void {
    this.remove(this.tags, tag);
  }

  add(list: string[], event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      list.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(list: string[], item: string): void {
    const index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
    }
  }
}
