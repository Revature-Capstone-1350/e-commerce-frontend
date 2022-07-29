export default class ProductInfo {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgUrlSmall: string;
  imgUrlMed: string;
  category: string;
  numberOfRatings: number;
  sumOfRatings: number;

  constructor (
      productId: number,
      name: string,
      description: string,
      price: number,
      imgUrlSmall: string,
      imgUrlMed: string,
      category: string,
      numberOfRatings: number,
      sumOfRatings: number,
    ) 
    {
      this.productId = productId;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imgUrlSmall = imgUrlSmall;
      this.imgUrlMed = imgUrlMed;
      this.category = category;
      this.numberOfRatings = numberOfRatings;
      this.sumOfRatings = sumOfRatings;
  }
};
