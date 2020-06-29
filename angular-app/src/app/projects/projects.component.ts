import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { ToggleChatService } from '../toggle-chat.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../app.component.css',
    './projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = PROJECTS;
  selectedProject: Project;

  constructor(private chat: ToggleChatService) { }

  ngOnInit(): void {
  }

  toggleChat() {
    this.chat.toggle();
  }
}
