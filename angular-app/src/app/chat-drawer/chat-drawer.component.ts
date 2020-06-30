import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-drawer',
  templateUrl: './chat-drawer.component.html',
  styleUrls: ['./chat-drawer.component.css']
})
export class ChatDrawerComponent implements OnInit {

  chats: string[] = ["hi", "lorem ipsum"];
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
