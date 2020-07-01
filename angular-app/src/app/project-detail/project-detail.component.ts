import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { ToggleChatService } from '../toggle-chat.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private files: string[] = ['audio.wav', 'audio.mp3', 'lyric1.txt', 'lyric2.docx']
  project$: Observable<Project>; // $ postfix simply indicates an Observable and has no function

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private chatService: ToggleChatService
  ) { }

  ngOnInit(): void {
    console.log("opening project detail view")
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectService.getProject(params.get('id')))
    );
  }

  toggleChat(): void {
    console.log("toggling chat");
    this.chatService.toggle();
  }
}
