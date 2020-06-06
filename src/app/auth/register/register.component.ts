import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements AfterViewInit, OnInit {
  public user = {
    email: '',
    password: '',
  };

  @ViewChild('registerForm') public ngForm;
  @ViewChild('email') public emailNgModel;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    console.log(this.emailNgModel);
  }

  public ngAfterViewInit(): void {
    console.log(this.ngForm);
    console.log(this.emailNgModel);
  }

  public async onSubmit($event) {
    const req = await this.authService.registerUser(this.user);
    console.log(req);
  }
}
