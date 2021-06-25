import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-configs/app-settings";
import {IUser} from "../interfaces/user.interface";


@Injectable({
  providedIn:'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _appSettings: AppSettings) {
  }

  post(user: IUser) {
    return this._http.post(`${this._appSettings.User.url.base}save`, user);
  }

  getAll() {
    return this._http.get(`${this._appSettings.User.url.base}getAllUsers`);
  }

}
