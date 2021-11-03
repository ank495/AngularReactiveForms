import { Component, OnInit } from '@angular/core';

import { Login } from '../login';
import { NgForm } from '@angular/forms';
import { PasswordValidatorDirective } from './username-validator.directive';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {
  login  = new Login();

  constructor() { }

  ngOnInit(): void {
  }

  submitLoginForm(loginForm: NgForm){
    console.log(loginForm);
  }

}
