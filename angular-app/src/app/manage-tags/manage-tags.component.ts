import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css']
})
export class ManageTagsComponent implements OnInit {

  public project: Project;

  public tags: string[] = [];
  public lyricsFileName: string;

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ManageTagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
    data.subscribe(project => {
      this.project = project;
      this.tags = project.tags;
    });
  }

  ngOnInit(): void {
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

  saveTags(): void {
    this.projectService.updateProject(this.project, { ["tags"]: this.tags });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
