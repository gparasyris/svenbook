import { IWidgetConfiguration } from '@interfaces/widget-configuration.interface';
import { IwebSocketResponse } from '@interfaces/websocket.interface'
import { IOrderTuple } from '@interfaces/order-tupple.interace';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { WebsocketService } from '@services/websocket-service/websocket.service';


export interface IOrderDisplayInfo {
  first: number;
  last: number;
  displayList: IOrderTuple[];
  cache: IOrderTuple[];
}

export interface IOrderbookData {
  bids: IOrderDisplayInfo;
  asks: IOrderDisplayInfo;
}

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
    if (event.target.innerHeight < 800) {
      this.length = 4
    }
    else {
      this.length = 8;
    }
  }

  data: IOrderbookData = {
    bids: {
      first: null,
      last: null,
      displayList: null,
      cache: null
    },
    asks: {
      first: null,
      last: null,
      displayList: null,
      cache: null
    }
  }

  // bids: IOrderTuple[] = [];
  // asks: IOrderTuple[] = [];
  // displayAsks: IOrderTuple[] = [];
  // displayBids: IOrderTuple[] = [];
  length = 8;
  // maxBid: number = -1;
  // maxAsk: number = -1;
  // firstBid: number = 0;
  // firstSell: number = 0;
  title: string;
  currentWindowWidth: number;
  iterator = [];
  webSocketSubscription: SubscriptionLike;

  constructor(public service: WebsocketService) {

  }

  @Input() set incomingData(value) {
    if (value["bids"] != null)
      this.handleData(value, this.data);
  }

  @Input() set configuration(value) {
    if (value != null) {
      this.processConfiguration(value);
    }
  }

  ngOnInit(): void {
    if (window.innerHeight < 800) {
      this.length = 4
    }
    else {
      this.length = 8;
    }
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

  prepareViewData(source: IOrderTuple[], destination: IOrderDisplayInfo): void {
    let arrayCopy: any[] = JSON.parse(JSON.stringify(destination?.cache || []))
    source.forEach((row) => {
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

    destination.cache = [...arrayCopy];
    destination.displayList = [...this.truncateArray(arrayCopy, this.length)];
    destination.last = destination.displayList[destination.displayList.length - 1][2];
    destination.first = destination.cache[0][0];
  };

  handleData(data: IwebSocketResponse, viewData: IOrderbookData): void {

    this.prepareViewData(data.bids, viewData.bids);
    // let arrayCopy: any[] = JSON.parse(JSON.stringify(viewData.bids?.cache || []))
    // data.bids.forEach((row) => {
    //   const position = arrayCopy.findIndex(x => x[0] == row[0]);
    //   if (position > -1) {
    //     if (row[1] == 0) {
    //       arrayCopy.splice(position, 1);
    //     }
    //     else {
    //       arrayCopy[position] = [...row];
    //     }
    //   }
    //   else if (row[1] != 0) {
    //     arrayCopy.push([...row]);
    //   }
    // });

    // arrayCopy = arrayCopy.
    //   sort((a, b) => b[0] - a[0])
    // for (const [index, row] of arrayCopy.entries()) {
    //   let add = row[1];
    //   if (index !== 0) {
    //     add += arrayCopy[index - 1][2]
    //   }
    //   row[2] = add;
    // }

    // viewData.bids.cache = [...arrayCopy];
    // viewData.bids.displayList = [...this.truncateArray(arrayCopy, this.length)];
    // viewData.bids.last = viewData.bids.displayList[viewData.bids.displayList.length - 1][2];
    // viewData.bids.first = viewData.bids.cache[0][0];



    let arrayCopy = JSON.parse(JSON.stringify(viewData.asks?.cache || []))
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
    viewData.asks.displayList = [...this.truncateArray(arrayCopy, this.length, true)];
    viewData.asks.cache = [...arrayCopy];
    viewData.asks.last = viewData.asks.displayList[0][2];
    viewData.asks.first = arrayCopy[0][0];
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