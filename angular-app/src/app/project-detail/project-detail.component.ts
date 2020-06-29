import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable } from 'rxjs';

import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { ToggleChatService } from '../toggle-chat.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project>; // $ postfix simply indicates an Observable and has no function

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chat: ToggleChatService
  ) { }

  ngOnInit(): void {
  }

  toggleChat(): void {
    console.log("toggling chat");
    this.chat.toggle();
  }
}
