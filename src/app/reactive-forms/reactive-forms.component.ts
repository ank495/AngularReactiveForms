import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { debounceTime } from 'rxjs/operators'

/**
 *
 *
 * @export
 * @class ReactiveFormsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  userInfoForm!: FormGroup;
  timeLine!: FormGroup;
  errorMessage!: string;
  constructor(private fb : FormBuilder,private datePipe : DatePipe) { }

  /**
   * this.userInfoForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      sex: new FormControl()
    })
   * this is also one of the way but it will have lot of
    boiler plate code, So we use Form Builder
    Three ways of providing values :
    1. firstName : ''
    2. firstName : {value: '', disabled:}
    3. firstName : ['',]
   *
    if we want to set the validator at the run time then we use setValidator om formgroup.
    If we want to reevaluate the changes then call updateValueAndValidity();

    We are adding the foirmArray to duplicate the input formcontrols e.g address.
   */
  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      firstName: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],// we can write like this as well
      lastName: ['',[Validators.required, Validators.maxLength(7)]],
      age: ['', Validators.required],
      sex: [{value: '', disabled:false},[Validators.required]],
      email: ['', Validators.email],
      phone:'',
      notification:'email',
      rating:['', this.ratingRangeWithParameters(1,5)],
      timeLine: this.fb.group({
        startDate : ['',Validators.required],
        endDate: ['', Validators.required]
      },{validator: this.dateRangeWithParameters}),
      adresses : this.fb.array([this.buildAddress()])
    })

    this.userInfoForm.get('notification')?.valueChanges.subscribe((value)=> {
      this.notificationClicked(value);
    })

    this.userInfoForm.get('age')?.valueChanges.pipe(debounceTime(1000)).subscribe((value) => this.setMessage(this.userInfoForm.controls.age));
  }

/**
 * Getter intsance for the form group
 *
 * @readonly
 * @type {FormArray}
 * @memberof ReactiveFormsComponent
 */
get Adresses(): FormArray {
 return <FormArray>this.userInfoForm.controls.adresses;
}

  private errorMessages: {[key: string]: string} = {
    required : 'Please enter the required filed'
  }
/**
 *  We are creating a genralized message so that we can remove unwanted error messages from the HTML file
 * and put them in to the controller layer.
 *
 * @param {AbstractControl} c
 * @memberof ReactiveFormsComponent
 */
setMessage(c:AbstractControl) {
  this.errorMessage = ''
    if((c.touched || c.dirty) && c.errors) {
       this.errorMessage = Object.keys(c.errors).map(key => this.errorMessages[key]).join('')
    }
  }


  addAdress(): void {
    this.Adresses.push(this.buildAddress());
  }

  buildAddress() : FormGroup {
    return this.fb.group({
      address: '',
      city: '',
      state: ''
    })
  }

  /**
   * When we want to set all the default values in the reactive form
   * then we go for set value.
   */
  setValue() {
   this.userInfoForm.setValue({
     firstName: 'Ankit',
     lastName : 'Kumar',
     age: 29,
     sex: 'Male'
   })
  }

  /**
   * When we want to set few properties only then we can go for patch value.
   */
  patchValue() {
    this.userInfoForm.patchValue({
      firstName: 'Pratibha',
      lastName : 'Hosley',
    })
  }

  /**
   * Run time validation using setValidators.
   *
   * @param {string} value
   * @memberof ReactiveFormsComponent
   */
  notificationClicked(value: string) : void {
  if(value === "phone") {
    this.userInfoForm.controls.phone.setValidators(Validators.required);
  } else {
    this.userInfoForm.controls.phone.clearValidators();
  }
   this.userInfoForm.controls.phone.updateValueAndValidity();
  }

  userFormSubmit() {

  }

  /**
   * Creating the custom validator function for rating.
   *
   * @param {AbstractControl} c
   * @return {*}  {({[key: string] : boolean} | null)}
   * @memberof ReactiveFormsComponent
   */
   ratingRange(c : AbstractControl) : {[key: string] : boolean} | null {
    if(c!= null && c.value > 1 && c.value < 5) {
     return null;
    } else {
      return {
        'rating' : true
      }
    }
  }

/**
 *
 *
 * @param {number} [min=0]
 * @param {number} [max=5]
 * @return {*}  {ValidatorFn}
 * @memberof ReactiveFormsComponent
 */
ratingRangeWithParameters(min=0, max=5) : ValidatorFn{
    return (c: AbstractControl) : {[key: string]: boolean} | null =>{
      if(c!= null && c.value >= min && c.value <= max) {
        return null;
       } else {
         return {
           'rating' : true
         }
       }
    }
  }


  /**
   *
   *
   * @param {*} [startDate=new Date()]
   * @param {*} [endDate=new Date()]
   * @return {*}  {ValidatorFn}
   * @memberof ReactiveFormsComponent
   */
  dateRangeWithParameters(startDate=new Date(), endDate=new Date()) : ValidatorFn{
    return (c: AbstractControl) : {[key: string]: boolean} | null =>{
      console.log("a");
      const startDate = this.datePipe.transform(c.get('startDate')?.value, "dd-MM-yyy");
      const endDate = this.datePipe.transform(c.get('endDate')?.value, "dd-MM-yyyy");
      if(startDate != null && endDate !=null && startDate < endDate) {
        return null;
      }else {
       return {
         'datemismatch' : true
       }
      }
    }
  }

}
