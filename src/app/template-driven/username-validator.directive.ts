import { AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

import { Directive } from '@angular/core';

//Trying to inject this as validator in the list of already existing validators
/**
 * The first element of this array is provide: NG_VALIDATORS. This is a special token and this will add (register) our validator to the collection of all existing validators
 *((like required or minlength).This means that all built-in validators are already added in NG_VALIDATORS token and we are adding our own validator to this.
 *  In next element useClass we are providing the class name of our custom directive.
 *  And last element multi: true is a special kind of provider. This will return multiple dependencies as a list of given token. Basically we are adding a new value to the NG_VALIDATORS token by taking advantage of multi providers.
 *
/**
 * This class is implementing Validator Interface. So here we need to override the Validate() method of this interface.
 * This validate() method accepts instance of FormControl as its parameter. And this instance is nothing but the control which we want to validate so in our case it will be userEmail control.
 * And last thing is our emailValidator() method. Inside this method we will actually define our customized logic for validation.This method will return null if Email address is in proper format otherwise return validation error.
 * @export
 * @class PasswordValidatorDirective
 * @implements {Validator}
 */
@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})


export class PasswordValidatorDirective implements Validator{

  validator: ValidatorFn;

  constructor() {
    this.validator = this.passwordValidator();
   }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if(control.value != null && control.value !== '') {
        let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(control.value);
        if (isValid) {
         return null;
       } else {
         return {
           emailvalidator: { valid: false }
         };
       }
     } else {
       return null;
     }
      };
  }

   validate(c: FormControl) {
     return this.validator(c);
   }
}

