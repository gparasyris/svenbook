import { Component, Input, OnInit } from '@angular/core';
import { debug } from 'node:console';

interface IwebSocketResponse {
  feed: string,
  product_id: string,
  bids: IOrderTuple[],
  asks: IOrderTuple[],
}

type IOrderTuple = [number, number, number?];


@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss']
})
export class OrderbookComponent implements OnInit {
  bids: IOrderTuple[] = [];
  asks: IOrderTuple[] = [];
  displayAsks: IOrderTuple[] = [];
  displayBids: IOrderTuple[] = [];
  length = 8;
  maxBid: number = -1;
  maxAsk: number = -1;
  firstBid: number = 0;
  firstSell: number = 0;

  iterator = [];
  constructor() { }
  

  @Input() set incomingData(value) {
    if (value["bids"] != null)
      this.handleData(value);
  }

  ngOnInit(): void {
    for(let i =0; i< this.length; i++){
      this.iterator.push(i);
    }
  }

  handleData(data: IwebSocketResponse) {
    let localBIds = JSON.parse(JSON.stringify(this.bids))
    data.bids.forEach((row) => {
      const position = localBIds.findIndex(x => x[0] == row[0]);
      if (position > -1) {
        if (row[1] == 0) {
          localBIds.splice(position, 1);
        }
        else {
          localBIds[position] = [...row];
        }
      }
      else if (row[1] != 0) {
        localBIds.push([...row]);
      }
    });

    localBIds = localBIds.
      sort((a, b) => b[0] - a[0])
    for (const [index, row] of localBIds.entries()) {
      let add = row[1];
      if (index !== 0) {
        add += localBIds[index - 1][2]
      }
      row[2] = add;
    }

    this.bids = [...localBIds];
    this.displayBids = [...this.truncateArray(localBIds, this.length)]; //.slice(0, 9)
    this.maxBid = localBIds[this.length +5][2];
    this.firstBid = this.bids[0][0];
    if(this.bids.length < this.length){
      debugger;
    }

    //
    localBIds = JSON.parse(JSON.stringify(this.asks))
    data.asks.forEach((row) => {
      const position = localBIds.findIndex(x => x[0] == row[0]);
      if (position > -1) {
        if (row[1] == 0) {
          localBIds.splice(position, 1);
        }
        else {
          localBIds[position] = [...row];
        }
      }
      else if (row[1] != 0) {
        localBIds.push([...row]);
      }
    });

    localBIds = localBIds.
      sort((a, b) =>  a[0] - b[0])
    for (const [index, row] of localBIds.entries()) {
      let add = row[1];
      if (index !== 0) {
        add += localBIds[index - 1][2]
      }
      row[2] = add;
    }


    // this.asks = [...localBIds]; //.slice(0, 9)
    // this.maxAsk = this.asks[this.length+1][2];
    this.displayAsks = [...this.truncateArray(localBIds, this.length, true)];
    this.asks = [...localBIds];
    this.maxAsk = localBIds[this.length +5][2]
    this.firstSell = localBIds[0][0]
    if(this.asks.length < this.length){
      debugger;
    }

  }

  trackByMethod(index: number, el: any): number {
    return index; //el[0];
  }

  truncateArray(array: any[], length: number, reverse = false) {
    if(!reverse) return array.slice(0, length);
    return array.slice(0, length).reverse();
  }

  getValue(array, index, position){
    return array?.[index]?.[position];
  }

}


// @Component({
//   selector: 'app-orderbook',
//   templateUrl: './orderbook.component.html',
//   styleUrls: ['./orderbook.component.scss']
// })
// export class mat-row implements OnInit {

// }