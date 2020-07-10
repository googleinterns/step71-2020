import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { ToggleChatService } from './toggle-chat.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

  @ViewChild('chat') public chat: MatSidenav;
  public user$;

  constructor(
    private authService: AuthService,
    private toggleChatService: ToggleChatService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  ngAfterViewChecked(): void {
    console.log("setting chat for toggle service");
    this.toggleChatService.setChat(this.chat);
  }

  login() {
    this.authService.login();
  }
}
