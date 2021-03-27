import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { environment } from '../../environments/environment';
import { catchError, tap, switchAll, delayWhen, retryWhen } from 'rxjs/operators';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
export const WS_ENDPOINT = 'w​ss://www.cryptofacilities.com/ws/v1​'; // environment.wsEndpoint;
export const RECONNECT_INTERVAL = 5000;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      // const messages = this.socket$.pipe(
      //   tap({
      //     error: error => console.log(error),
      //   }), catchError(_ => EMPTY));
      // this.messagesSubject$.next(messages);
      this.socket$.subscribe(    
        msg => {}, 
        // Called whenever there is a message from the server    
        err => console.warn(err), 
        // Called if WebSocket API signals some kind of error    
        () => console.log('complete') 
        // Called when connection is closed (for whatever reason)  
     );
    }
  }

  // private getNewWebSocket() {
  //   return webSocket(WS_ENDPOINT);ƒ√
  // }
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }

    /**
   * Return a custom WebSocket subject which reconnects after failure
   */
     private getNewWebSocket() {
      //  return webSocket('wss://www.cryptofacilities.com/ws/v1');
      return webSocket({
        url: 'wss://www.cryptofacilities.com/ws/v1',
        openObserver: {
          next: () => {
            console.log('[DataService]: connection ok');
          }
        },
        closeObserver: {
          next: () => {
            console.log('[DataService]: connection closed');
            this.socket$ = undefined;
            this.connect({ reconnect: true });
          }
        },
  
      });
    }

     /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
      private reconnect(observable: Observable<any>): Observable<any> {
        return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Data Service] Try to reconnect', val)),
          delayWhen(_ => timer(RECONNECT_INTERVAL)))));
      }
}