import { Router } from '@angular/router';
import { WebsocketService } from '@services/websocket-service/websocket.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'svenbook';

  constructor(public service: WebsocketService,  private router: Router) {

  }

  /*
    Demo function for illustration purposes only
  */
  demoSwitch() {
    const target =  window.location.pathname.includes('orderbook-single') ? 'orderbook-multiple' : 'orderbook-single';
    this.router.navigateByUrl(`/dashboards/${target}`);
  }
}
