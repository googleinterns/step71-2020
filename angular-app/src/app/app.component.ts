import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleChatService } from './toggle-chat.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('chat') public chat: MatSidenav;

  constructor(private toggleChatService: ToggleChatService) {
  }

  ngOnInit(): void {
    this.toggleChatService.setChat(this.chat);
  }

  toggleChat() {
    this.toggleChatService.toggle();
  }
}
