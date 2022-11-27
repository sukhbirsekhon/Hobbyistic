import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { Hobby } from './hobby.model';
import {Router} from '@angular/router';

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
    this.http.post("http://localhost:3000/api/login", {user})
    .subscribe(response =>{
      console.log(response)
      var token = [JSON.stringify(response)][0].slice(18, [JSON.stringify(response)][0].length - 3)
      console.log(token)
      localStorage.setItem('token', token)
      this.router.navigate(['/main']);
    })
  }

  AddHobby(name: string) {
    let header = new HttpHeaders().set(
      'Authorization',
       `Bearer ${localStorage.getItem('token')!}`
    );
    const hobby: Hobby = {name:name}
    console.log('inside add hobby')
    console.log({hobby})
    this.http.post("http://localhost:3000/api/hobby", {hobby}, {headers: header})
    .subscribe(response =>{
      console.log(response);
      this.router.navigate(['/main']);
    })
  }

  GetAllHobbies(): string[] {
    let header = new HttpHeaders().set(
      'Authorization',
       `Bearer ${localStorage.getItem('token')!}`
    );
    let hobbies: string[] = []
    this.http.get("http://localhost:3000/api/hobby", {headers: header})
    .subscribe(response =>{
      var data = JSON.stringify(response);
      var parseData = JSON.parse(data);
      console.log(parseData)
      for (var i = 0; i < parseData.length; i++) {
        hobbies.push(parseData[i].name)
      }
    })
    return hobbies;
  }
}
