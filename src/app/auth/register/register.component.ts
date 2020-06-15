/**
 * Komponent formularza rejestracji korzystający z Formularzy Szablonowych
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthUser } from '../model/auth-user.interface';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements AfterViewInit, OnInit {
  /* Model wykorzystywany do bindowania `ngModel` w formularzu  */
  public user: AuthUser = {
    email: '',
    password: '',
  };

  /**
   * Dekorator `ViewChild` pozwala na przypisanie referencji do elementów szablonu w klasie Komponentu.
   * UWAGA! Elementy deklarowane w ten sposób są dostępne od momentu hooka `ngAfterViewInit`
   */
  @ViewChild('registerForm') public ngForm: NgForm;
  @ViewChild('email') public emailNgModel: NgModel;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {}

  /**
   * Metoda `onSubmit` wywoływane podczas wysłania formularza w szablonie HTML
   */
  public async onSubmit($event) {
    const req = await this.authService.registerUser(this.user);
  }
}
