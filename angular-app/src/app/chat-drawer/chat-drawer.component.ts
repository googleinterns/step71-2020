import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat-drawer',
  templateUrl: './chat-drawer.component.html',
  styleUrls: ['./chat-drawer.component.css']
})
export class ChatDrawerComponent implements AfterViewInit {

  chats: string[] = ["hi", "lorem ipsum",
    "this is an extra long message to see how the chat currently renders content that flows onto multiple lines",
    "and", "these", "are", "a", "bunch", "of", "short", "messages", "to", "show", "how", "the", "view", "deals",
    "with", "more", "messages", "and", "therefore", "vertical", "overflow"];
  message: string;

  constructor() { }

  ngAfterViewInit(): void {
    this.scrollToEnd();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  sendMessage(message: string) {
    this.chats.push(message);
    this.message = "";
    this.delay(10).then(_ => this.scrollToEnd());
  }

  private scrollToEnd(): void {
    let chatList = document.getElementById("chat-channel");
    chatList.scrollTop = chatList.scrollHeight;
  }
}
