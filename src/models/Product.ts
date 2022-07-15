/**
 * Product model
 */
export default class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    category: string;

    //constructor for Product class
    constructor(id: number, name: string, quantity: number, description: string, price: number, image: string, category: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
    }
}