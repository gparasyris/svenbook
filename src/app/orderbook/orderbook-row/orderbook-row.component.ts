import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderbook-row',
  templateUrl: './orderbook-row.component.html',
  styleUrls: ['./orderbook-row.component.scss']
})
export class OrderbookRowComponent implements OnInit, OnDestroy {

  @Input() price: number;
  @Input() amount: number;
  @Input() total: number;
  removed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    console.log('removing', this.price);
    this.removed = true;
  }

}
