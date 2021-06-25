import {IUser} from "../../interfaces/user.interface";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "../../services/user.service";
import {UserActions} from "./user.actions";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AlertDialog} from "../dialog/dialog.action";
import {DialogAlertEnum} from "../../enums/dialog-alert.enum";


export class UserStateModel {
  user: IUser | undefined;
  users: IUser[] | undefined;
}

export const defaults = {
  user: undefined,
  users: []
}

@State({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {

  constructor(private readonly _userService: UserService) {
  }

  @Selector()
  static postUser(state: UserStateModel) :IUser {
    return <IUser>state.user;
  }

  @Selector()
  static getUsers(state: UserStateModel): IUser[] | undefined{
    return state.users;
  }

  @Action(UserActions.Post)
  post(
    ctx: StateContext<UserStateModel>,
    action: UserActions.Post
  ): Observable<IUser> {
    return this._userService.post(action.user)
      .pipe(
        tap((success: any)=>{
            ctx.patchState({
              user: success
            });
          ctx.dispatch(new AlertDialog.Open({
            title: action.alerTitle.success,
            text: success.message,
            type: DialogAlertEnum.success
          }));
        }));
  }

  @Action(UserActions.GetAll)
  get(
    ctx: StateContext<UserStateModel>
  ): Observable<IUser[]> {
    return this._userService.getAll()
      .pipe(
        tap((success: any)=> {
            ctx.patchState({
              users: success
            });
        }));
  }

}
