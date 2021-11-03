import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ReactiveFormsComponent } from './reactive-forms.component';

const routes: Routes = [{
  path:'',
  component: ReactiveFormsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
