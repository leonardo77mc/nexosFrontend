import {IUser} from "../../interfaces/user.interface";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "../../services/user.service";
import {UserActions} from "../user/user.actions";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AlertDialog} from "../dialog/dialog.action";
import {DialogAlertEnum} from "../../enums/dialog-alert.enum";
import {Iproduct} from "../../interfaces/product.interface";
import {ProductService} from "../../services/product.service";
import {ProductActions} from "./product.actions";


export class ProductStateModel {
  product: Iproduct | undefined;
  products: Iproduct[] | undefined;
}

export const defaults = {
  product: undefined,
  products: []
}

@State({
  name: 'product',
  defaults
})
@Injectable()
export class ProductState {

  constructor(private readonly _productService: ProductService) {
  }

  @Selector()
  static postProduct(state: ProductStateModel): Iproduct {
    return <Iproduct>state.product;
  }

  @Selector()
  static getProducts(state: ProductStateModel): Iproduct[] | undefined {
    return state.products;
  }

  @Action(ProductActions.Post)
  post(
    ctx: StateContext<ProductStateModel>,
    action: ProductActions.Post
  ): Observable<Iproduct> {
    console.log('product que se envia:', action.product);
    return this._productService.post(action.product)
      .pipe(
        tap((success: any) => {
          ctx.patchState({
            product: success
          });
          ctx.dispatch(new AlertDialog.Open({
            title: action.alerTitle.success,
            text: success.message,
            type: DialogAlertEnum.success
          }));
        }));
  }

  @Action(ProductActions.GetAll)
  get(
    ctx: StateContext<ProductStateModel>
  ): Observable<Iproduct[]> {
    return this._productService.getAll()
      .pipe(
        tap((success: any) => {
          ctx.patchState({
            products: success
          });
        }));
  }

}
