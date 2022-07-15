export default class Product {
    product_id: number;
    category: string;
    name: string;
    description: string;
    price: number;
    image_url_s: string
    image_url_m: string

    constructor (product_id: number, category: string, name: string, description: string, price: number, image_url_s: string, image_url_m: string) {
        this.product_id = product_id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_url_s = image_url_s;
        this.image_url_m = image_url_m;
    }
}