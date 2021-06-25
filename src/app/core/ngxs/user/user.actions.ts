import {IAlertTitle} from "../../interfaces/role.interface";
import {IUser} from "../../interfaces/user.interface";


export namespace UserActions {

  export class Post {
    static readonly type = '[User] add role';
    constructor(public user: IUser, public alerTitle: IAlertTitle) {}
  }

  export class GetAll {
    static readonly type = '[User] get roles';
  }

}
