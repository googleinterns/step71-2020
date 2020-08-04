import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';

import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<Project[]>;
  selectedProject: Project;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }

  createNewProject() : void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
  }
}
