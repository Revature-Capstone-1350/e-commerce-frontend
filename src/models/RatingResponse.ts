export default class Rating {
  id: number;
  rating: number;
  description: string;
  reviewerId: number;
  reviewerName: string;
  productId: number;

  constructor(
        id: number,
        rating: number,
        description: string,
        reviewerId: number,
        reviewerName: string,
        productId: number
  ) {
      this.id = id;
      this.rating = rating;
      this.description = description;
      this.reviewerId = reviewerId;
      this.reviewerName = reviewerName;
      this.productId = productId;
  }
}
