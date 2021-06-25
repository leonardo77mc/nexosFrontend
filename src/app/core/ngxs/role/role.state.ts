import {IRole} from "../../interfaces/role.interface";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {RoleService} from "../../services/role.service";
import {RoleActions} from "./role.actions";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DialogAlertEnum} from "../../enums/dialog-alert.enum";
import {AlertDialog} from "../dialog/dialog.action";

export class RoleStateModel {
  role: IRole | undefined;
  roles: IRole[] | undefined;
}

const defaults: RoleStateModel = {
  role: undefined,
  roles: []
}

@State({
  name: "role",
  defaults
})
@Injectable()
export class RoleState {

  constructor(private readonly _roleService: RoleService) {
  }

  @Selector()
  static saveRole(state: RoleStateModel): IRole {
    return <IRole>state.role;
  }

  @Selector()
  static getRoles(state: RoleStateModel) : IRole[] {
    return <IRole[]>state.roles;
  }

  @Action(RoleActions.Post)
  post(
    ctx: StateContext<RoleStateModel>,
    actions: RoleActions.Post
  ): Observable<IRole> {
    return this._roleService.post(actions.role)
      .pipe(
        tap((success: any) => {
          ctx.patchState({
            role: success
          });
          ctx.dispatch(new AlertDialog.Open({
            title: actions.alerTitle.success,
            text: success.message,
            type: DialogAlertEnum.success
          }));
        }));
  }

  @Action(RoleActions.GetAll)
  getAll(
    ctx: StateContext<RoleStateModel>
  ): Observable<IRole[]> {
    return this._roleService.get().pipe(
      tap((sucess: any) => {
        ctx.patchState({roles:sucess});
      }));
  }

}

