import Address from './Address';
import Product from './Product';

export default class Order {
  orderId: number;
  userId: number;
  address: Address;
  items: Product[];
  status: string;

  constructor(
    orderId: number,
    userId: number,
    address: Address,
    items: Product[],
    status: string
  ) {
      this.orderId = orderId;
      this.userId = userId;
      this.address = address;
      this.items = items;
      this.status = status;
    }
}
