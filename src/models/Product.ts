// export default class Product {
//     id: number;
//     name: string;
//     quantity: number;
//     price: number;
//     description: string;
//     image: string;

//     constructor (id: number, name: string, quantity: number, description: string, price: number, image: string) {
//         this.id = id;
//         this.name = name;
//         this.quantity = quantity;
//         this.description = description;
//         this.price = price;
//         this.image = image;
//     }
// }

export default class Product {
    product_id: number;
    category: string;
    name: string;
    description: string;
    price: number;
    image_url: string

    constructor (product_id: number, category: string, name: string, description: string, price: number, image_url: string) {
        this.product_id = product_id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_url = image_url;
    }
}