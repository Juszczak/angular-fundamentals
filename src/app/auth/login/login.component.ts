import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public buttonDisabled$ = this.formGroup.statusChanges.pipe(
    map((status) => status === 'INVALID'),
    startWith(true),
  );

  public emailMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const emailErrors = this.formGroup.controls.email?.errors;
      if (emailErrors) {
        if (emailErrors?.required) {
          return 'This filed is required';
        }
        if (emailErrors?.email) {
          return 'Wrong email format';
        }
      }
      return '';
    }),
  );

  public passwordMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const passwordErrors = this.formGroup.controls.password?.errors;
      if (passwordErrors && this.formGroup.controls.password?.dirty) {
        if (passwordErrors.required) {
          return 'Password is required';
        }
        if (passwordErrors.minlength) {
          return 'Password should have at least 8 characters';
        }
        return '';
      } else {
        return '';
      }
    }),
  );

  constructor() {}

  public ngOnInit(): void {
    const valueChanges$ = this.formGroup.valueChanges;
    const statusChanges$ = this.formGroup.statusChanges;

    statusChanges$.subscribe((status) => {});

  }

}
