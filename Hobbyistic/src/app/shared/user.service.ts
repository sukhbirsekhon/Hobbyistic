import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user.model';
import {Router} from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient, private router: Router) { }

  private formatErrors(error: any) {
    console.log('format the fucking error', error)
    return throwError(() => new Error(error))
  }

  CreateUser(name: string, email: string, password: string){
    const user: User = {name:name, email: email, password: password}
    this.http.post("http://localhost:3000/api/register", user)
    .subscribe(response =>{
      console.log(response);
      this.router.navigate(['/login']);
    })
  }

  AuthenticateUser(name: string, email: string, password: string) {
    const user: User = {name:name, email: email, password: password}
    console.log('23')
    this.http.post("http://localhost:3000/api/login", JSON.stringify({'user': 'test'}))
    .pipe(catchError(this.formatErrors))
    .subscribe(response =>{

      console.log(response);
      this.router.navigate(['/main']);

    })
  }


}
