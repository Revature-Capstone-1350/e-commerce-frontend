export default class UpdateProductRequest {
    id: number;
    category: number;
    name: string;
    description: string;
    price: number;
    imageUrlS: string;
    imageUrlM: string;

    constructor(id:number, category: number, name: string, description: string, price: number, imageUrlS: string, imageUrlM: string) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrlS = imageUrlS;
        this.imageUrlM = imageUrlM;
    }
}