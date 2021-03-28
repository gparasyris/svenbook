import { WebsocketService } from './websocket.service';
import { Component } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'svenbook';
  liveData$: Observable<any>;

  myWebSocket: WebSocketSubject<any> = webSocket('wss://www.cryptofacilities.com/ws/v1');

  constructor(public service: WebsocketService) {
    this.service.connect();
    setTimeout(() => {
      this.sendMsg();
    }, 5000);
  //   this.myWebSocket.subscribe(    
  //     msg => console.log('message received: ' + msg), 
  //     // Called whenever there is a message from the server    
  //     err => console.log(err), 
  //     // Called if WebSocket API signals some kind of error    
  //     () => console.log('complete') 
  //     // Called when connection is closed (for whatever reason)  
  //  );
  }

  somethingElse(){
    // this.liveData$ = this.service.messages$.pipe(
    //   map((rows: any) => rows.data),
    //   catchError(error => { throw error }),
    //   tap({
    //     error: error => console.log('[Live component] Error:', error),
    //     complete: () => console.log('[Live component] Connection Closed')
    //   }
    //   )
    // );
    // this.myWebSocket.asObservable().subscribe(dataFromServer => //...);
    // {
    //   console.log(dataFromServer);
    // })
  }

  sendMsg() {
    this.service.sendMessage( {"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}​);

    // this.myWebSocket.next({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});

  }

  getDelta() {
  //   this.service.sendMessage({  
  //     "feed":"book",
  //     "product_id":"FI_XBTUSD_180316",
  //     "side":"buy",
  //     "seq":2,
  //     "price":10027.0,
  //     "qty":10.0
  // })
  }
}
