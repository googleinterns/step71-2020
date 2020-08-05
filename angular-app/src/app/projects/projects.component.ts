import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../project';
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
    private authService: AuthService,
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.projects$ = this.projectService.getUserProjects(user.uid);
    });
  }

  createNewProject() : void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
  }
}
