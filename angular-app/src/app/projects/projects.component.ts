import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { ToggleChatService } from '../toggle-chat.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<Project[]>;
  selectedProject: Project;

  constructor(
    private toggleChatService: ToggleChatService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }

  toggleChat(): void {
    console.log("toggling chat");
    this.toggleChatService.toggle();
  }
}
