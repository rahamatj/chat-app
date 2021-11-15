import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8080/chat");

    this.webSocket.onopen = (e) => {
      console.log("Open: ", e);
    }

    this.webSocket.onmessage = (e) => {
      this.chatMessages.push(JSON.parse(e.data));
    }

    this.webSocket.onclose = (e) => {
      console.log("Close: ", e);
    }
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
