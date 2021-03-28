import { IWidgetConfiguration } from '@interfaces/widget-configuration.interface';
import { IwebSocketResponse } from '@interfaces/websocket.interface'
import { IOrderTuple } from '@interfaces/order-tupple.interace';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { WebsocketService } from '@services/websocket-service/websocket.service';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss'],
  providers: [WebsocketService],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class OrderbookComponent implements OnInit {

  onResize(event) {
    this.currentWindowWidth = event.target.innerWidth
  }

  bids: IOrderTuple[] = [];
  asks: IOrderTuple[] = [];
  displayAsks: IOrderTuple[] = [];
  displayBids: IOrderTuple[] = [];
  length = 8;
  maxBid: number = -1;
  maxAsk: number = -1;
  firstBid: number = 0;
  firstSell: number = 0;
  title: string;
  currentWindowWidth: number;

  iterator = [];

  webSocketSubscription: SubscriptionLike;

  constructor(public service: WebsocketService) {

  }

  @Input() set incomingData(value) {
    if (value["bids"] != null)
      this.handleData(value);
  }

  @Input() set configuration(value) {
    if (value != null) {
      this.processConfiguration(value);
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < this.length; i++) {
      this.iterator.push(i);
    }
    this.currentWindowWidth = window.innerWidth;


  }

  processConfiguration(config: IWidgetConfiguration): void {
    this.title = config.title;
    this.service.connect();
    this.service.sendMessage({ "event": config.event, "feed": config.feed, "product_ids": [config.product_id] });
    this.webSocketSubscription = this.service.socket$.subscribe(
      msg => {
        this.incomingData = msg;
      },
      err => console.log(err),
    )
  }

  handleData(data: IwebSocketResponse): void {
    let arrayCopy: any[] = JSON.parse(JSON.stringify(this.bids))
    data.bids.forEach((row) => {
      const position = arrayCopy.findIndex(x => x[0] == row[0]);
      if (position > -1) {
        if (row[1] == 0) {
          arrayCopy.splice(position, 1);
        }
        else {
          arrayCopy[position] = [...row];
        }
      }
      else if (row[1] != 0) {
        arrayCopy.push([...row]);
      }
    });

    arrayCopy = arrayCopy.
      sort((a, b) => b[0] - a[0])
    for (const [index, row] of arrayCopy.entries()) {
      let add = row[1];
      if (index !== 0) {
        add += arrayCopy[index - 1][2]
      }
      row[2] = add;
    }

    this.bids = [...arrayCopy];
    this.displayBids = [...this.truncateArray(arrayCopy, this.length)];
    this.maxBid = this.displayBids[this.displayBids.length - 1][2];
    this.firstBid = this.bids[0][0];
    if (this.bids.length < this.length) {
      debugger;
    }

    arrayCopy = JSON.parse(JSON.stringify(this.asks))
    data.asks.forEach((row) => {
      const position = arrayCopy.findIndex(x => x[0] == row[0]);
      if (position > -1) {
        if (row[1] == 0) {
          arrayCopy.splice(position, 1);
        }
        else {
          arrayCopy[position] = [...row];
        }
      }
      else if (row[1] != 0) {
        arrayCopy.push([...row]);
      }
    });

    arrayCopy = arrayCopy.
      sort((a, b) => a[0] - b[0])
    for (const [index, row] of arrayCopy.entries()) {
      let add = row[1];
      if (index !== 0) {
        add += arrayCopy[index - 1][2]
      }
      row[2] = add;
    }
    this.displayAsks = [...this.truncateArray(arrayCopy, this.length, true)];
    this.asks = [...arrayCopy];
    this.maxAsk = this.displayAsks[0][2];
    this.firstSell = arrayCopy[0][0]
    if (this.asks.length < this.length) {
      debugger;
    }

  }

  trackByMethod(index: number, el: any): number {
    return index;
  }

  truncateArray(array: IOrderTuple[] | any[], length: number, reverse = false): IOrderTuple[] | any[] {
    if (!reverse) return array.slice(0, length);
    return array.slice(0, length).reverse();
  }

  ngOnDestroy() {
    this.webSocketSubscription?.unsubscribe();
  }

}