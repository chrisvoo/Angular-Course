import {Component, OnInit} from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit{
  formGroup!: FormGroup
  submitted = false
  email: string = ''
  subscription = 'Advanced'
  password: string = ''
  hobbies: string[] = []
  forbiddenHobbies: string[] = ['Cricket']

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.checkEmail()),
      subscription: new FormControl('Advanced'),
      password: new FormControl(null, Validators.required),
      hobbies: new FormArray([])
    })
  }

  get hobbiesControls() {
    return (this.formGroup.get('hobbies') as FormArray).controls
  }

  onSubmit() {
    this.submitted = true
    this.email = this.formGroup.value.email
    this.subscription = this.formGroup.value.subscription
    this.password = this.formGroup.value.password
    this.hobbies = this.formGroup.value.hobbies
  }

  onAddHobby() {
    const controls = this.formGroup.get('hobbies') as FormArray;
    controls.push(new FormControl(null, [Validators.required, this.checkForbiddenHobbies()]))
  }

  checkForbiddenHobbies(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.forbiddenHobbies.some(r => control.value?.includes(r))) {
        return {hobbyIsForbidden: true}
      }
      return null;
    }
  }

  checkEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            console.log(control.value)
            resolve({ emailForbidden: true })
          } else {
            resolve(null)
          }
        }, 1000)
      })
    }
  }
}
