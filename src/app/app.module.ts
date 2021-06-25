import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAlertComponent } from './utils/dialog-alert/dialog-alert.component';
import { CreateInventoryComponent } from './pages/create-inventory/create-inventory.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgxsModule} from "@ngxs/store";
import {RoleState} from "./core/ngxs/role/role.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {HttpClientModule} from "@angular/common/http";
import {AppSettings} from "./core/app-configs/app-settings";
import {RoleService} from "./core/services/role.service";
import {Dialogs} from "./utils/dialogs";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UserState} from "./core/ngxs/user/user.state";
import {ProductState} from "./core/ngxs/product/product.state";

@NgModule({
  declarations: [
    AppComponent,
    DialogAlertComponent,
    CreateInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxsModule.forRoot([
      RoleState,
      UserState,
      ProductState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule
  ],
  providers: [AppSettings, RoleService, Dialogs],
  bootstrap: [AppComponent]
})
export class AppModule { }
