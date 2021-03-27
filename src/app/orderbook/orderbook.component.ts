import { Component, Input, OnInit } from '@angular/core';

interface IwebSocketResponse {
  feed: string,
  product_id: string,
  bids: IOrderTuple[],
  asks: IOrderTuple[],
}

type IOrderTuple = [number, number];


@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss']
})
export class OrderbookComponent implements OnInit {
  bids: IOrderTuple[] =[];
  asks: IOrderTuple[] = [];
  length = 8;

  constructor() { }

  @Input() set incomingData (value){
    if(value["bids"] != null)
      this.handleData(value);
  }

  ngOnInit(): void {

  }

  handleData(data: IwebSocketResponse) {
    let localBIds = JSON.parse(JSON.stringify(this.bids))
    data.bids.forEach((row) => {
      const position = localBIds.findIndex(x => x[0] == row[0]);
      if(position > -1 ){
        if(row[1] == 0){
          localBIds.splice(position, 1);
        }
        else {
          localBIds[position] = [...row];
        }
      }
      else if(row[1] != 0){
        localBIds.push([...row]);
      }
    });
    
    localBIds = localBIds.//[].concat([...localBIds, ...(data.bids.filter(x => x[1] != 0) || [])]).
    sort((a, b) =>  b[0] - a[0])//.slice(8); // webworker work
    // localBIds[0].push(localBIds[0][1])
    // for(let i = 1; i<; i--){

    // }
    for(const [index, row] of localBIds.entries()){
      let add = row[1];
      if(index !== 0) {
        add += localBIds[index-1][2]
      }
      row[2] =add;
    }

    this.bids = localBIds; //.slice(0, 9)

  }

  trackByMethod(index:number, el:any): number {
    return index; //el[0];
  }

  truncateArray(array: any[], length: number){
    return array.slice(0, length);
  }

}
