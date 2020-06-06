import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public registerUser(user) {
    return this.httpClient.post('https://reqres.in/api/register', user).toPromise();
  }
}
