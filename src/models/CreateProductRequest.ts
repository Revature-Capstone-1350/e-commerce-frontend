export default class CreateProductRequest {
    category: number;
    name: string;
    description: string;
    price: number;
    imageUrlS: string;
    imageUrlM: string;

    constructor(category: number, name: string, description: string, price: number, imageUrlS: string, imageUrlM: string) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrlS = imageUrlS;
        this.imageUrlM = imageUrlM;
    }
}