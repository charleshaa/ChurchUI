import { Component, OnInit } from '@angular/core';
import { SocketService, Message } from '../../services/socket.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})

export class ConsoleComponent implements OnInit {

  messages: Message[];
  connection: any;
  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.messages = [];
    this.socket.initSocket();
    this.connection = this.socket.onMessage()
                    .subscribe((message: Message) => {
                      console.log(message);
                      this.messages.unshift(message);
                    });
  }

  sendCmd(cmd){
    this.socket.send(cmd.target.value);
  }

}
