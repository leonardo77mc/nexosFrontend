import {IAlertTitle, IRole} from "../../interfaces/role.interface";


export namespace RoleActions {

  export class Post {
    static readonly type = '[Roles] add role';
    constructor(public role: IRole, public alerTitle: IAlertTitle) {}
  }

  export class GetAll {
    static readonly type = '[Roles] get roles';
  }

}
