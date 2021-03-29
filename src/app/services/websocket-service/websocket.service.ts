import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '@environments/environment';
import { catchError, switchAll } from 'rxjs/operators';
import { Subject } from 'rxjs';
export const WS_ENDPOINT = environment.wsEndpoint;

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
    }
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }

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
          this.socket$.error('connection closed');
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