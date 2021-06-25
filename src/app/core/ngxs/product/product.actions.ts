import {IAlertTitle} from "../../interfaces/role.interface";
import {Iproduct} from "../../interfaces/product.interface";

export namespace ProductActions {

  export class Post {
    static readonly type = '[Product] add product';
    constructor(public product: Iproduct, public alerTitle: IAlertTitle) {}
  }

  export class GetAll {
    static readonly type = '[Product] get product';
  }

}
