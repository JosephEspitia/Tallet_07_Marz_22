export class Product {
    _id:string;
    name:string;
    price:number;
    availableElemnts: number;
    description: string;

    constructor(name="", price=0, availableElemnts=0, description="", _id="") {
        this._id=_id
        this.name=name;
        this.price=price;
        this.availableElemnts=availableElemnts;
        this.description=description;
    }
}