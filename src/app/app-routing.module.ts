import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [{
  path:'Template',
  loadChildren: () => import('./template-driven/template-forms.module').then(m => m.TemplateFormsModule)
}, {
  path: 'Reactive',
  loadChildren: () => import('./reactive-forms/reactive-forms.module').then(m => m.ReactiveFormsModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
