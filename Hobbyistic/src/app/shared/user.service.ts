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
      console.log('Create user response:')
      console.log(response);
      this.router.navigate(['/login']);
    })
  }

  AuthenticateUser(name: string, email: string, password: string) {
    const user: User = {name:name, email: email, password: password}
    this.http.post("http://localhost:3000/api/login", {user})
    .subscribe(response =>{
      console.log('Authenticate user response:')
      console.log(response)
      var token = [JSON.stringify(response)][0].slice(18, [JSON.stringify(response)][0].length - 3)
      console.log('Token for the session: ' + token)
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
    this.http.post("http://localhost:3000/api/hobby", {hobby}, {headers: header})
    .subscribe(response =>{
      console.log('Add Hobby response:');
      console.log(response)
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
      var data = JSON.parse(JSON.stringify(response));
      for (var i = 0; i < data.length; i++) {
        hobbies.push(data[i].name)
      }
    })
    return hobbies;
  }

  eHobby() {

  }

  EditHobby(oldName: string, newName: string) {
    let header = new HttpHeaders().set(
      'Authorization',
       `Bearer ${localStorage.getItem('token')!}`
    );
    let oldNameId = this.getIdForHobby(oldName);
    const hobby: Hobby = {name:newName}
    console.log({hobby})
    console.log(oldNameId)
    this.http.post("http://localhost:3000/api/hobby/" + oldNameId, {hobby}, {headers: header})
    .subscribe(response =>{
      console.log('Edit hobby response:');
      console.log(response)
      this.router.navigate(['/main']);
    })
  }

  getIdForHobby(oldName: string):string {
    let header = new HttpHeaders().set(
      'Authorization',
       `Bearer ${localStorage.getItem('token')!}`
    );
    let oldNameId = '';

     this.http.get("http://localhost:3000/api/hobby", {headers: header})
    .subscribe(response =>{
      var data = JSON.parse(JSON.stringify(response));
      console.log('Get all hobby from edit hobby function response:' )
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        if(data[i].name == oldName){
          oldNameId = data[i].id
          console.log('Hobby named ' + oldName + ' id is ' + oldNameId)
        }
      }
    })
    return oldNameId;
  }
}
