import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { environment } from '../../environments/environment';
import { catchError, tap, switchAll, delayWhen, retryWhen } from 'rxjs/operators';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
export const WS_ENDPOINT = 'wss://www.cryptofacilities.com/ws/v1'; // environment.wsEndpoint;
export const RECONNECT_INTERVAL = 5000;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  public socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(WS_ENDPOINT);
      this.socket$.subscribe(
        msg => { },
        err => console.warn(err),
        () => console.log('complete')
      );
    }
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }

  /**
 * Return a custom WebSocket subject which reconnects after failure
 */
  private getNewWebSocket(webSocketUri) {
    return webSocket({
      url: webSocketUri,
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

  public ngOnDestroy() {
    this.socket$?.unsubscribe();
  }
}