export class ProductDetails {

    id: number;
    brandName: string;
    modelName: string;
    productColor: string;
    productWeight: string;
    productManufacturer: string;

    constructor (id: number, brandName: string, modelName: string, productColor: string, productWeight: string, productManufacturer: string) {
        this.id = id;
        this.brandName = brandName;
        this.modelName = modelName;
        this.productColor = productColor;
        this.productWeight = productWeight;
        this.productManufacturer = productManufacturer;

    }



}
