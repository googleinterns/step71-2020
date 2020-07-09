import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { ToggleChatService } from './toggle-chat.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('chat') public chat: MatSidenav;
  public user$;

  constructor(
    public authService: AuthService,
    private toggleChatService: ToggleChatService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  ngAfterViewInit(): void {
    this.toggleChatService.setChat(this.chat);
  }

  login() {
    this.authService.login();
  }
}
