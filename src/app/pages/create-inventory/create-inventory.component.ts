import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from '@ngxs/store';
import {RoleState} from "../../core/ngxs/role/role.state";
import {Observable, Subscription} from "rxjs";
import {IRole} from "../../core/interfaces/role.interface";
import {RoleActions} from "../../core/ngxs/role/role.actions";
import {DialogAlertEnum} from "../../core/enums/dialog-alert.enum";
import {Dialogs} from "../../utils/dialogs";
import {UserActions} from "../../core/ngxs/user/user.actions";
import {UserState} from "../../core/ngxs/user/user.state";
import {IUser} from "../../core/interfaces/user.interface";
import {ProductActions} from "../../core/ngxs/product/product.actions";

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent implements OnInit {

  @Select(RoleState.saveRole) role$!: Observable<IRole>;
  @Select(RoleState.getRoles) rols$!: Observable<IRole[]>;
  @Select(UserState.postUser) user$!: Observable<IUser>;
  @Select(UserState.getUsers) users$!: Observable<IUser[]>;

  public users: IUser[] = [];
  public roles: IRole[] = [];
  public ages: number[] = [];
  private date!: number;
  public formRole: FormGroup | undefined;
  public formUser: FormGroup | undefined;
  public formProduct: FormGroup | undefined;
  private subscrip: Subscription[] = [];

  constructor(private _fb: FormBuilder, private _store: Store, private _dialog: Dialogs) {
    this.date = new Date().getTime();
    for (let i = 1; i <= 100; i++) {
      this.ages.push(i);
    }
  }

  ngOnInit(): void {
    this.createFormUser();
    this.createForm();
    this.createFormProduct();

    this._store.dispatch(new RoleActions.GetAll());
    this._store.dispatch(new UserActions.GetAll());

    this.subscrip.push(this.role$.subscribe((item) => {
      if (item != null) {
        this.roles.push(item);
      }
    }));

    this.subscrip.push(this.rols$.subscribe((items) => {
      if (items?.length > 0) {
        this.roles = [];
        this.roles = items;
      }
    }));

    this.subscrip.push(this.users$.subscribe((items) => {
      if (items?.length > 0) {
        this.users = [];
        this.users = items;
      }
    }));

    this.subscrip.push(this.user$.subscribe((item) => {
      if (item != null) {
        this.users.push(item);
      }
    }));

  }

  createForm() {
    this.formRole = this._fb.group({
      name: ['', Validators.required],
      createAt: this.date,
      updateAt: '',
      deleteAt: ''
    })
  }

  createFormUser() {
    this.formUser = this._fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      idRole: ['', Validators.required],
      createAt: this.date,
      updateAt: '',
      deleteAt: ''
    })
  }

  createFormProduct() {
    this.formProduct = this._fb.group({
      name: ['', Validators.required],
      quantity: [null, Validators.required],
      price: ['', Validators.required],
      user: [''],
      userConfig: [''],
      createAt: this.date,
      updateAt: '',
      deleteAt: ''
    });
  }

  onCreate() {

    this._dialog.showDialogAlertOption({
      title: 'Guardar Rol',
      text: 'Desea guardar los cambios',
      type: DialogAlertEnum.question,
      showCancelButton: true,
      textCancelButton: 'No',
      textConfirButton: 'Si',
      disableClose: true,
    }).then(
      (result) => {
        if (result.value) {
          this._store.dispatch(new RoleActions.Post(this.formRole?.value,
            {success: 'El rol se ha creado correctamente', error: 'Error al Guardar'}));
          this.formRole?.reset();
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.subscrip.forEach(sub => sub.unsubscribe());
  }

  onSave() {

    this._dialog.showDialogAlertOption({
      title: 'Guardar Usuario',
      text: 'Desea guardar los cambios',
      type: DialogAlertEnum.question,
      showCancelButton: true,
      textCancelButton: 'No',
      textConfirButton: 'Si',
      disableClose: true,
    }).then(
      (result) => {
        if (result.value) {
          this._store.dispatch(new UserActions.Post(this.formUser?.value,
            {success: 'El Usuario se ha creado correctamente', error: 'Error al Guardar'}));
          this.formUser?.reset();
        }
      }
    );

  }

  onSaveProduct() {

    if(this.formProduct?.value.createAt <= new Date().getTime()){

    this.formProduct?.get('userConfig')?.setValue(this.formProduct?.value.user);
    this._dialog.showDialogAlertOption({
      title: 'Guardar Producto',
      text: 'Desea guardar los cambios',
      type: DialogAlertEnum.question,
      showCancelButton: true,
      textCancelButton: 'No',
      textConfirButton: 'Si',
      disableClose: true,
    }).then(
      (result) => {
        if (result.value) {
          this._store.dispatch(new ProductActions.Post(this.formProduct?.value,
            {success: 'El Producto se ha creado correctamente', error: 'Error al Guardar'}));
          this.formProduct?.reset();
        }
      }
    );
    } else {
           this._store.dispatch(this._dialog.showDialogAlertOption({
             title: "Error, la fecha es mayor a la actual"
           }));
    }
  }
}
