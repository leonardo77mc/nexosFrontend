import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-configs/app-settings";
import {Iproduct} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient, private _appSettings: AppSettings) {
  }

  post(product: Iproduct) {
    return this._http.post(`${this._appSettings.Product.url.base}save`, product);
  }

  getAll() {
    return this._http.get(`${this._appSettings.Product.url.base}getAllProducts`);
  }
}
