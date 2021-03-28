import { Subject } from "rxjs";



export class WebSocketServiceMock {

  private socket$ = new Subject<any>();

  connect(url: string): void {
    console.log(`Websocket would connect to ${url}.`);

    this.socket$.next(mockData);
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  close() {
    this.socket$.complete();
  }
}

export const mockData = {
  "feed": "book_ui_1",
  "product_id": "PI_XBTUSD",
  "bids": [
    [
      53167.5,
      0
    ],
    [
      54164,
      50000
    ],
    [
      54186,
      25837
    ],
    [
      54189,
      30000
    ],
    [
      54189.5,
      40000
    ],
    [
      54194,
      20490
    ],
    [
      54218,
      0
    ],
    [
      54221.5,
      15000
    ],
    [
      54228.5,
      0
    ],
    [
      54229,
      0
    ],
    [
      54235,
      45169
    ]
  ],
  "asks": [
    [
      54266.5,
      30000
    ],
    [
      54270,
      90500
    ],
    [
      54271,
      30000
    ],
    [
      54271.5,
      0
    ],
    [
      54272.5,
      0
    ],
    [
      54273,
      7189
    ],
    [
      54274.5,
      0
    ],
    [
      54281.5,
      0
    ],
    [
      54287.5,
      48540
    ],
    [
      54306.5,
      150000
    ],
    [
      54326,
      200
    ],
    [
      54331.5,
      174061
    ],
    [
      54334,
      0
    ],
    [
      54337,
      200000
    ],
    [
      54337.5,
      0
    ],
    [
      54352.5,
      10600
    ],
    [
      54354,
      0
    ],
    [
      54354.5,
      0
    ],
    [
      54679.5,
      3558
    ],
    [
      54749.5,
      0
    ]
  ]
}

export const mockDataWithZero = {
  "feed": "book_ui_1",
  "product_id": "PI_XBTUSD",
  "bids": [
    [54235, 0]
  ],
  "asks": [

  ]
}

export const preccalculatedResults = {
  firstSell: 54266.5,
  maxASk: 530490,
  firstBid: 54235,
  secondBid: 54221.5,
  maxBid: 226496
}