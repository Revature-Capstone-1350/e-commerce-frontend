export default class Product {
    productId: number;
    category: string;
    name: string;
    description: string;
    price: number;
    imgUrlSmall: string
    imgUrlMed: string

    constructor(productId: number, category: string, name: string, description: string, price: number, imgUrlSmall: string, imgUrlMed: string) {
        this.productId = productId;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgUrlSmall = imgUrlSmall;
        this.imgUrlMed = imgUrlMed;
    }
}
