import AddressDTO from './AddressDTO';
import ProductInfo from './ProductInfo';

export default class OrderDTO {
  orderId: number;
  userId: number;
  address: AddressDTO;
  items: ProductInfo[];
  status: string;
  
  constructor(
    orderId: number,
    userId: number,
    address: AddressDTO,
    items: ProductInfo[],
    status: string,
  ) 
  {
    this.orderId = orderId;
    this.userId = userId;
    this.address = address;
    this.items = items;
    this.status = status;
  }
};
