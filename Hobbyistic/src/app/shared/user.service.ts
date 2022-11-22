import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient) { }

  CreateUser(name: string, email: string, password: string){
    const user: User = {name:name, email: email, password: password}
    this.http.post("http://localhost:3000/api/register", user)
    .subscribe(response =>{
      console.log(response);
  })

  }
}
