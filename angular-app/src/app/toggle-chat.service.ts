import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ToggleChatService {
  private chat: MatSidenav;

  constructor() { }

  public setChat(chat: MatSidenav) {
    this.chat = chat;
  }

  public open() {
    return this.chat.open();
  }

  public close() {
    return this.chat.close();
  }

  public toggle(): void {
    this.chat.toggle();
  }
}
