import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MatSidenav } from '@angular/material/sidenav';

import { ToggleChatService } from './toggle-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('chat') public chat: MatSidenav;

  constructor(
    public auth: AngularFireAuth,
    private toggleChatService: ToggleChatService
  ) {}

  ngAfterViewInit(): void {
    this.toggleChatService.setChat(this.chat);
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
