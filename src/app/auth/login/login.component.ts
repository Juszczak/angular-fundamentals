import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../model/auth-response.interface';
import { AuthUser } from '../model/auth-user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    const valueChanges$ = this.formGroup.valueChanges;
    const statusChanges$ = this.formGroup.statusChanges;

    statusChanges$.subscribe((status) => {});
  }

  public onSubmit($event) {
    if (this.formGroup.valid) {
      const user: AuthUser = this.formGroup.value;
      this.authService.loginUser(user).subscribe((response: AuthResponse) => {
        if (response.error) {
          this.snackBar.open('Login failed', null, {
            duration: 1000,
          });
          return;
        }

        if (response.token) {
          this.snackBar.open('Logged in!', null, {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigateByUrl('/settings');
        }
      });
    }
  }
}
