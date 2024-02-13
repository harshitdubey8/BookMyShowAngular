import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:80/api/login';
    const userObj = { email, password };
    return this.http.post(url, userObj);
  }

  signUp(userObj: any): Observable<any> {
    const url: string = 'http://localhost:80/api/register';
    return this.http.post(url, userObj);
  }
}
