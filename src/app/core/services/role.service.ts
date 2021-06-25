import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-configs/app-settings";
import {IRole} from "../interfaces/role.interface";


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private _http: HttpClient, private _appSettings: AppSettings) {
  }

  post(role: IRole) {
    return this._http.post(`${this._appSettings.Role.url.base}save`, role);
  }

  get() {
    return this._http.get(`${this._appSettings.Role.url.base}allRoles`);
  }

}
