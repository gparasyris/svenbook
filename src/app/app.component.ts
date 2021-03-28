import { WebsocketService } from './websocket.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'svenbook';

  constructor(public service: WebsocketService) {

  }
}
