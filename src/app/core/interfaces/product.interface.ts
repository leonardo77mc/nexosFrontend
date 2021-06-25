import {IUser} from "./user.interface";

export interface Iproduct {
  id: number
  name: string;
  quantity: number;
  price: number;
  user: IUser;
  userConfig: IUser;
  createAt: number;
  updateApp: number;
  deleteAt: number;
}
