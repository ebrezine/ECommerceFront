import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string, question:string, answer:string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password, question:question, answer:answer};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  getUserByEmail(email:string):Observable<User> {
    return this.http.get<User>(`${this.authUrl}/`+email);
  }

  changePassword(email:any, password:string):Observable<User>{
    return this.http.patch<User>(`${this.authUrl}/resetPassword`, {"email":email, "password": password});
  }
  
}
