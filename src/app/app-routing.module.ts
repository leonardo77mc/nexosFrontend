import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateInventoryComponent} from "./pages/create-inventory/create-inventory.component";

const routes: Routes = [
  {
    path: '', component: CreateInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
