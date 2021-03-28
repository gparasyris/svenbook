import { IOrderTuple } from "@interfaces/order-tupple.interace";

export interface IwebSocketResponse {
  feed: string,
  product_id: string,
  bids: IOrderTuple[],
  asks: IOrderTuple[],
}