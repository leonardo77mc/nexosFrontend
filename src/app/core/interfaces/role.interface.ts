export interface IRole {
  id?:number;
  name: string;
  userRoles?: IUserRole;
  createAt: number;
  updateAt: number;
  deleteAt: number;
}

export interface IUserRole {
  id: number;
  user: any;
  roles: any;
  createAt: number;
  updateAt: number;
  deleteAt: number;
}

export interface IAlertTitle {
  error?: string;
  success?: string;
}
