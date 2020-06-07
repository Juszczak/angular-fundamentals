import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthUser } from '../model/auth-user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements AfterViewInit, OnInit {
  public user: AuthUser = {
    email: '',
    password: '',
  };

  @ViewChild('registerForm') public ngForm;
  @ViewChild('email') public emailNgModel;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {}

  public async onSubmit($event) {
    const req = await this.authService.registerUser(this.user);
  }
}
