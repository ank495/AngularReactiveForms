import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordValidatorDirective } from './username-validator.directive';
import { TemplateRoutingModule } from './template.routing.module';

@NgModule({
  declarations: [
    PasswordValidatorDirective
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateFormsModule { }
